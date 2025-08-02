<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\PengaduanKhusus;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\PengaduanKhususResource;

class PengaduanKhususController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        /** @var \App\Models\User */
        $user = Auth::user();

        if ($user->hasRole('admin') || $user->hasRole('kades')) {
            $pengaduans = PengaduanKhusus::latest()->get();
        } elseif ($user->hasRole('mahasiswa')) {
            $pengaduans = PengaduanKhusus::where('user_id', $user->id)->latest()->get();
        }

        
        return Inertia::render('menu/pengaduan-khusus/index', compact('pengaduans'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('menu/pengaduan-khusus/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'judul' => 'required|max:100',
            'kronologi' => 'required|max:255',
            'waktu_kejadian' => 'required|date',
            'tempat_kejadian' => 'required|max:100',
            'berkas' => 'required|array|min:1',
            'berkas.*' => 'required|mimes:jpg,jpeg,png|file|max:1024',
            'anonim' => 'required|boolean',
        ]);

        DB::beginTransaction();

        try {
            $pengaduan = PengaduanKhusus::create([
                'user_id' => Auth::user()->id,
                'judul' => $validatedData['judul'],
                'kronologi' => $validatedData['kronologi'],
                'waktu_kejadian' => $validatedData['waktu_kejadian'],
                'tempat_kejadian' => $validatedData['tempat_kejadian'],
                'anonim' => $validatedData['anonim'],
            ]);

            $pengaduan->status()->create([
                'pengaduan_khusus_id' => $pengaduan->id,
                'tindakan' => 'pengaduan masih dalam proses peninjauan',
            ]);

            if ($request->hasFile('berkas')) {
                foreach ($validatedData['berkas'] as $berkas) {
                    $path = $berkas->store('berkas_pengaduan', 'public');

                    $pengaduan->berkas()->create([
                        'path_berkas' => $path,
                        'pengaduan_khusus_id' => $pengaduan->id
                    ]);
                }
            }

            DB::commit();

            return to_route('pengaduan-khusus.index');
        } catch (\Exception $e) {
            DB::rollback();
            return back()->with('error', 'Gagal mengirim pengaduan.' . $e);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(PengaduanKhusus $pengaduanKhusus)
    {
        return Inertia::render('menu/pengaduan-khusus/show-pengaduan', [
            'pengaduan' => new PengaduanKhususResource($pengaduanKhusus)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PengaduanKhusus $pengaduanKhusus)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PengaduanKhusus $pengaduanKhusus)
    {
        $validatedData = $request->validate([
            'status' => 'required|in:Diajukan,Diproses,Selesai,Ditolak',
            'tindakan' => 'required',
        ]);


        $pengaduanKhusus->status()->update($validatedData);

        return back();
    }

    public function updateValidasi(Request $request, PengaduanKhusus $pengaduanKhusus)
    {
        $validatedData = $request->validate([
            'validasi_kades' => 'required|boolean'
        ]);

        $pengaduanKhusus->update([
            'validasi_kades' => $validatedData['validasi_kades']
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PengaduanKhusus $pengaduanKhusus)
    {
        foreach ($pengaduanKhusus->berkas as $berkas) {
            if ($berkas->path && Storage::disk('public')->exists($berkas->path)) {
                Storage::disk('public')->delete($berkas->path);
            }
            $berkas->delete();
        }

        $pengaduanKhusus->delete();

        return back()->with('success', 'Pengaduan dan semua berkas berhasil dihapus.');
    }
}
