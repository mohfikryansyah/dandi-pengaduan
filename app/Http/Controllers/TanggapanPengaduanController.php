<?php

namespace App\Http\Controllers;

use App\Models\Pengaduan;
use Illuminate\Http\Request;
use App\Models\TanggapanPengaduan;
use Illuminate\Support\Facades\Auth;

class TanggapanPengaduanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'tanggapan' => 'required|max:255',
        ]);
        $pengaduan_id = $request->pengaduan_id;
        $pengaduan = Pengaduan::where('id', $pengaduan_id)->first();
        $pengaduan->tanggapans()->create([
            'user_id' => Auth::user()->id,
            'pengaduan_id' => $pengaduan_id,
            'tanggapan' => $validatedData['tanggapan']
        ]);
     
        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(TanggapanPengaduan $tanggapanPengaduan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TanggapanPengaduan $tanggapanPengaduan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TanggapanPengaduan $tanggapanPengaduan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TanggapanPengaduan $tanggapan)
    {
        /** @var \App\Models\User $user */  
        $user = Auth::user();

        if($user->id !== $tanggapan->user_id && !$user->hasRole('admin')) {
            return back()->withErrors('Anda tidak diizinkan untuk menghapus ini.');
        }

        $tanggapan->delete();
        return back();
    }
}
