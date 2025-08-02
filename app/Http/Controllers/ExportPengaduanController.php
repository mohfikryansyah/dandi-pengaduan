<?php

namespace App\Http\Controllers;

use App\Dusun;
use Carbon\Carbon;
use App\Models\Pengaduan;
use App\Models\PengaduanKhusus;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;

class ExportPengaduanController extends Controller
{
    public function export(Request $request)
    {
        /** @var \App\Models\User */
        $user = Auth::user();
        $role = $user->getRoleNames()->first();
        $start = $request->start ? Carbon::parse($request->start)->startOfDay() : null;
        $end = $request->end ? Carbon::parse($request->end)->endOfDay() : null;

        $query = Pengaduan::query();

        if ($start && $end) {
            $query->whereBetween('created_at', [$start, $end]);
            $range = "Periode: " . date('d M Y', strtotime($start)) . " - " . date('d M Y', strtotime($end));
        } elseif ($start) {
            $query->where('created_at', '>=', $start);
            $range = "Dari: " . date('d M Y', strtotime($start));
        } elseif ($end) {
            $query->where('created_at', '<=', $end);
            $range = "Sampai: " . date('d M Y', strtotime($end));
        } else {
            $range = "Semua Data";
        }

        $roleDusunMap = [
            'kadus_1' => Dusun::DUSUN1->value,
            'kadus_2' => Dusun::DUSUN2->value,
            'kadus_3' => Dusun::DUSUN3->value,
            'kadus_4' => Dusun::DUSUN4->value,
        ];

        if (!in_array($role, ['admin', 'kades']) && isset($roleDusunMap[$role])) {
            $query->whereHas('user', function ($q) use ($roleDusunMap, $role) {
                $q->where('dusun', $roleDusunMap[$role]);
            });
        }

        $pengaduan = $query->with('user')->get();

        if ($pengaduan->isEmpty()) {
            return back()->with('error', 'Tidak ada data pengaduan untuk diekspor.');
        }

        $pdf = Pdf::loadView('pdf.pengaduan-pdf', compact('pengaduan', 'range'))
            ->setPaper('a4', 'portrait');

        return $pdf->download('laporan-pengaduan-' . now()->translatedFormat('d-F-Y-H-i-s') . '.pdf');
    }


    
}
