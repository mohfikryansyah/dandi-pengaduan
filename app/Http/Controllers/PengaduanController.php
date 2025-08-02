<?php

namespace App\Http\Controllers;

use App\Http\Resources\AuthUserResource;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Pengaduan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\PengaduanResource;

class PengaduanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        /** @var \App\Models\User */
        $user = Auth::user();

        $pengaduans = Pengaduan::query();

        $role = $user->getRoleNames()->first();

        $roleDusunMap = [
            'kadus_1' => 'Dusun Ilomata',
            'kadus_2' => 'Dusun Tamboo',
            'kadus_3' => 'Dusun Bongo',
            'kadus_4' => 'Dusun Bongo 2',
        ];

        if (in_array($role, ['admin', 'kades'])) {
            $pengaduans = $pengaduans->latest()->get();
        } elseif (isset($roleDusunMap[$role])) {
            $pengaduans = $pengaduans
                ->whereHas('user', function ($query) use ($roleDusunMap, $role) {
                    $query->where('dusun', $roleDusunMap[$role]);
                })
                ->latest()
                ->get();
        } elseif ($role === 'masyarakat') {
            $pengaduans = $pengaduans
                ->where('user_id', $user->id)
                ->latest()
                ->get();
        } else {
            $pengaduans = collect(); // Kosongkan kalau rolenya nggak dikenal
        }


        return Inertia::render('menu/pengaduan/index', compact('pengaduans'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('menu/pengaduan/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'judul' => 'required|max:100',
            'isi' => 'required',
            'berkas' => 'required|array|min:1',
            'berkas.*' => 'required|mimes:jpg,jpeg,png|file|max:1024',
        ]);

        DB::beginTransaction();

        try {
            $pengaduan = Pengaduan::create([
                'user_id' => Auth::user()->id,
                'judul' => $validatedData['judul'],
                'isi' => $validatedData['isi'],
            ]);

            $pengaduan->status()->create([
                'pengaduan_id' => $pengaduan->id,
                'tindakan' => 'pengaduan masih dalam proses peninjauan',
            ]);

            if ($request->hasFile('berkas')) {
                foreach ($validatedData['berkas'] as $berkas) {
                    $path = $berkas->store('berkas_pengaduan', 'public');

                    $pengaduan->berkas()->create([
                        'path_berkas' => $path,
                        'pengaduan_id' => $pengaduan->id
                    ]);
                }
            }

            DB::commit();

            return to_route('pengaduan.index');
        } catch (\Exception $e) {
            DB::rollback();
            return back()->with('error', 'Gagal mengirim pengaduan.' . $e);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Pengaduan $pengaduan)
    {
        $kadusUsers = User::role(['kadus_1', 'kadus_2', 'kadus_3', 'kadus_4'])->get();

        return Inertia::render('menu/pengaduan/show-pengaduan', [
            'pengaduan' => new PengaduanResource($pengaduan),
            'kadus_users' => AuthUserResource::collection($kadusUsers)->resolve(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pengaduan $pengaduan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pengaduan $pengaduan)
    {
        $validatedData = $request->validate([
            'status' => 'required|in:Diteruskan ke Kepala Dusun,Ditolak',
            'tindakan' => 'nullable',
            'diteruskan_ke' => 'required_if:status,Diteruskan ke Kepala Dusun|exists:users,id',
        ]);

        DB::beginTransaction();

        try {
            $pengaduan->status()->create([
                'status' => $validatedData['status'],
                'tindakan' => $validatedData['tindakan'],
            ]);

            $pengaduan->update([
                'diteruskan_ke' => $validatedData['diteruskan_ke'],
            ]);

            DB::commit();
            return back();
        } catch (\Exception $th) {
            DB::rollback();
            return back()->with('error', 'Gagal memperbarui status pengaduan: ' . $th->getMessage());
        }
    }

    public function validasiKadus(Request $request, Pengaduan $pengaduan)
    {
        $validatedData = $request->validate([
            'status' => 'required|in:Diverifikasi Kepala Dusun,Ditolak Kepala Dusun',
            'tindakan' => 'nullable',
        ]);

        DB::beginTransaction();

        try {
            $pengaduan->status()->create([
                'status' => $validatedData['status'],
                'tindakan' => $validatedData['tindakan'],
            ]);

            DB::commit();
            return back();
        } catch (\Exception $th) {
            DB::rollback();
            return back()->with('error', 'Gagal memperbarui status pengaduan: ' . $th->getMessage());
        }
    }

    public function validasiKades(Request $request, Pengaduan $pengaduan)
    {
        $validatedData = $request->validate([
            'status' => 'required|string'
        ]);

        $pengaduan->status()->create([
            'status' => $validatedData['status']
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pengaduan $pengaduan)
    {
        foreach ($pengaduan->berkas as $berkas) {
            if ($berkas->path && Storage::disk('public')->exists($berkas->path)) {
                Storage::disk('public')->delete($berkas->path);
            }
            $berkas->delete();
        }

        $pengaduan->delete();

        return back()->with('success', 'Pengaduan dan semua berkas berhasil dihapus.');
    }
}
