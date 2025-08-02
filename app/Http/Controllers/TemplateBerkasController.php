<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\TemplateBerkas;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class  TemplateBerkasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('menu/template-berkas/pages', [
            'templateBerkas' => TemplateBerkas::with(['user'])->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('menu/template-berkas/create', [
            'templateBerkas' => TemplateBerkas::get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_berkas' => 'required|string|max:255',
            'path' => 'required|file|mimes:docx',
            'form_fields' => 'nullable|array',
            'form_fields.*.name' => 'required|string',
            'form_fields.*.label' => 'required|string',
            'form_fields.*.type' => 'required|in:text,textarea,date,number',
        ]);

        $filePath = $request->file('path')->store('template_berkas', 'public');

        TemplateBerkas::create([
            'user_id' => Auth::user()->id,
            'nama_berkas' => $validated['nama_berkas'],
            'path' => $filePath,
            'form_fields' => $validated['form_fields'],
        ]);

        return to_route('template-berkas.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(TemplateBerkas $templateBerkas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TemplateBerkas $templateBerkas)
    {
        return Inertia::render('menu/template-berkas/edit', compact('templateBerkas'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TemplateBerkas $templateBerkas)
    {
        if ($templateBerkas->user_id !== Auth::id()) {
            abort(403, 'Akses ditolak.');
        }

        $validatedData = $request->validate([
            'nama_berkas' => 'required|string|max:255',
            'path' => 'nullable|file|max:512',
        ]);

        if ($request->hasFile('path')) {
            if (Storage::disk('public')->exists($templateBerkas->path)) {
                Storage::disk('public')->delete($templateBerkas->path);
            }

            $filePath = $request->file('path')->store('template-berkas', 'public');
            $templateBerkas->path = $filePath;
        }

        $templateBerkas->nama_berkas = $validatedData['nama_berkas'];
        $templateBerkas->save();

        return redirect()->route('template-berkas.index')->with('success', 'Template berkas berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TemplateBerkas $templateBerkas)
    {
        if ($templateBerkas->user_id !== Auth::user()->id) {
            abort(403, 'Akses ditolak');
        }

        if (Storage::disk('public')->exists($templateBerkas->path)) {
            Storage::disk('public')->delete($templateBerkas->path);
        }

        $templateBerkas->delete();

        return back();
    }
}
