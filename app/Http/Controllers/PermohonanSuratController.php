<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\TemplateBerkas;
use App\Models\PermohonanSurat;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpWord\TemplateProcessor;

class PermohonanSuratController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:admin|kades|masyarakat');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        extract(User::getCurrentUserWithRole());
        $query = PermohonanSurat::query();

        if ($role === 'admin' || $role === 'kades') {
            $permohonanSurats = $query->with('pemohon')->latest()->get();
        } elseif ($role === 'masyarakat') {
            $permohonanSurats = $query->where('pemohon_id', $user)->with('pemohon')->latest()->get();
        } else {
            abort(403, 'Akses ditolak.');
        }

        return inertia('menu/permohonan-surat/pages', [
            'permohonanSurats' => $permohonanSurats,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('menu/permohonan-surat/create', [
            'templateSurats' => TemplateBerkas::get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $template = TemplateBerkas::findOrFail($request->template_surat_id);
        $formFields = collect($template->form_fields);

        $rules = [];

        foreach ($formFields as $field) {
            $fieldName = "data_form.{$field['name']}";

            $typeRule = match ($field['type']) {
                'date' => 'date',
                'number' => 'numeric',
                default => 'string'
            };

            $rules[$fieldName] = "required|{$typeRule}";
        }

        $validated = $request->validate($rules);

        $user = Auth::user();

        PermohonanSurat::create([
            'pemohon_id' => $user->id,
            'template_surat_id' => $template->id,
            'judul_surat' => $template->nama_berkas . ' - ' . $user->name,
            'data_form' => $validated['data_form'],
            'path_surat' => '',
        ]);

        return to_route('permohonan-surat.index');
    }


    /**
     * Display the specified resource.
     */
    public function show(PermohonanSurat $permohonanSurat)
    {
        return inertia('menu/permohonan-surat/show', [
            'permohonanSurat' => $permohonanSurat->load(['pemohon', 'templateSurat']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PermohonanSurat $permohonanSurat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PermohonanSurat $permohonanSurat)
    {
        $validatedData = $request->validate([
            'status' => 'required|in:Pending,Disetujui,Ditolak',
            'keterangan' => 'required_if:status,Ditolak|max:255',
            'nomor_surat' => 'required_if:status,Disetujui',
        ]);


        if ($validatedData['status'] === 'Ditolak') {
            $permohonanSurat->update($validatedData);
            return back();
        }

        if ($validatedData['status'] === 'Disetujui') {
            $templateSurat = Storage::disk('public')->path($permohonanSurat->templateSurat->path);
            $dataForm = $permohonanSurat->data_form;

            if (!Storage::disk('public')->exists($permohonanSurat->templateSurat->path)) {
                return 'berkas tidak ditemukan';
            }

            $formFields = collect($permohonanSurat->templateSurat->form_fields)
                ->mapWithKeys(fn($item) => [$item['name'] => $item['type']])
                ->toArray();


            $templateProcessor = new TemplateProcessor($templateSurat);

            foreach ($dataForm as $key => $value) {
                $type = $formFields[$key] ?? 'text';

                $formattedValue = match ($type) {
                    'date' => Carbon::parse($value)->locale('id')->translatedFormat('d F Y'),
                    'number' => number_format((float)$value),
                    default => $value,
                };

                $templateProcessor->setValue('${' . $key . '}', $formattedValue);
                $templateProcessor->setValue('${tanggal_surat}', Carbon::now()->locale('id')->translatedFormat('d F Y'));
            }

            $outputPath = 'permohonan-surat/' . $permohonanSurat->judul_surat . ' - ' . now()->timestamp . '.docx';

            if ($permohonanSurat->path_surat && Storage::disk('public')->exists($permohonanSurat->path_surat)) {
                Storage::disk('public')->delete($permohonanSurat->path_surat);
            }

            Storage::disk('public')->makeDirectory('permohonan-surat');
            $templateProcessor->saveAs(Storage::disk('public')->path($outputPath));

            $permohonanSurat->update([
                'status' => $validatedData['status'],
                'path_surat' => $outputPath,
                'nomor_surat' => $validatedData['nomor_surat'],
            ]);
        }

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PermohonanSurat $permohonanSurat)
    {
        extract(User::getCurrentUserWithRole());

        if ($role !== 'admin' && $permohonanSurat->pemohon_id !== $user->id) {
            abort(403, 'Akses ditolak.');
        }

        if ($permohonanSurat->path_surat && Storage::disk('public')->exists($permohonanSurat->path_surat)) {
            Storage::disk('public')->delete($permohonanSurat->path_surat);
        }

        $permohonanSurat->delete();

        return back();
    }
}
