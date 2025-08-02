<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pengaduan;
use App\Models\PengaduanKhusus;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $countAllPengaduan = Pengaduan::count();
        $countPengaduanDiproses = Pengaduan::denganStatus('Diproses')->count();
        $countPengaduanSelesai = Pengaduan::denganStatus('Selesai')->count();
        $chartData = Pengaduan::chartData()->get();
        $pengaduans = Pengaduan::latest()->get();
        return Inertia::render('landing-page/landing-page', compact('pengaduans', 'chartData', 'countAllPengaduan', 'countPengaduanDiproses', 'countPengaduanSelesai'));
    }
}
