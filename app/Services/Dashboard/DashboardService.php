<?php

namespace App\Services\Dashboard;


use App\Models\User;
use App\Models\Pengaduan;
use App\Models\PengaduanKhusus;
use App\Models\PermohonanSurat;

class DashboardService
{
    public function getDashboardData(?int $userId = null, ?string $kadus_ID = null): array
    {
        $queryPengaduanUmum = Pengaduan::query();
        $querySurat = PermohonanSurat::query();

        if ($userId) {
            $queryPengaduanUmum->where('user_id', $userId);
            $querySurat->where('pemohon_id', $userId);
        }

        if ($kadus_ID) {
            $queryPengaduanUmum->where('diteruskan_ke', $kadus_ID);
        }

        $chartData = $this->getCombinedChartData($queryPengaduanUmum, $querySurat);

        return [
            // Pengaduan
            'countAllPengaduan' => $queryPengaduanUmum->count(),
            'countPengaduanDiajukan' => (clone $queryPengaduanUmum)->denganStatus('Diteruskan ke Kepala Dusun')->count(),
            'countPengaduanDiproses' => (clone $queryPengaduanUmum)->denganStatus('Diverifikasi Kepala Dusun')->count(),
            'countPengaduanSelesai' => (clone $queryPengaduanUmum)->denganStatus('Selesai')->count(),
            'pengaduanTervalidasi' => (clone $queryPengaduanUmum)->latest()->take(5)->get(),

            // Permohonan Surat
            'countAllSurat' => $querySurat->count(),
            'countSuratPending' => (clone $querySurat)->where('status', 'Pending')->count(),
            'countSuratDisetujui' => (clone $querySurat)->where('status', 'Disetujui')->count(),
            'countSuratDitolak' => (clone $querySurat)->where('status', 'Ditolak')->count(),
            'suratTervalidasi' => (clone $querySurat->with(['pemohon']))->latest()->take(5)->get(),

            // Chart
            'chartData' => $chartData,
        ];
    }


    /**
     * Gabungin chart data dari Pengaduan Umum + Pengaduan Khusus.
     */
    protected function getCombinedChartData($queryPengaduanUmum, $querySurat): \Illuminate\Support\Collection
    {
        $dataPengaduan = (clone $queryPengaduanUmum)
            ->selectRaw('
            DATE_FORMAT(created_at, "%M") as month,
            MONTH(created_at) as month_number,
            COUNT(*) as pengaduan
        ')
            ->where('created_at', '>=', now()->subMonths(6)->startOfMonth())
            ->groupBy('month', 'month_number')
            ->orderBy('month_number')
            ->get();

        $dataSurat = (clone $querySurat)
            ->selectRaw('
            DATE_FORMAT(created_at, "%M") as month,
            MONTH(created_at) as month_number,
            COUNT(*) as surat
        ')
            ->where('created_at', '>=', now()->subMonths(6)->startOfMonth())
            ->groupBy('month', 'month_number')
            ->orderBy('month_number')
            ->get();

        $result = collect();
        $allMonths = $dataPengaduan->pluck('month')->merge($dataSurat->pluck('month'))->unique();

        foreach ($allMonths as $month) {
            $pengaduan = $dataPengaduan->firstWhere('month', $month);
            $surat = $dataSurat->firstWhere('month', $month);

            $result->push([
                'month' => $month,
                'month_number' => $pengaduan->month_number ?? $surat->month_number,
                'pengaduan' => $pengaduan->pengaduan ?? 0,
                'surat' => $surat->surat ?? 0,
            ]);
        }

        return $result->sortBy('month_number')->values();
    }
}
