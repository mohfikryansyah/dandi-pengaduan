<?php

use App\Models\User;
use Inertia\Inertia;
use App\Models\Pengaduan;
use App\Helpers\DusunHelper;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Services\Dashboard\DashboardService;
use App\Http\Controllers\PengaduanController;
use App\Http\Controllers\TemplateBerkasController;
use App\Http\Controllers\ExportPengaduanController;
use App\Http\Controllers\PengaduanKhususController;
use App\Http\Controllers\PermohonanSuratController;
use App\Http\Controllers\TanggapanPengaduanController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware('auth')->group(function () {
    Route::resource('umum/pengaduan', PengaduanController::class)
        ->middlewareFor(['create', 'store'], 'role:masyarakat')
        ->middlewareFor(['destroy', 'update'], 'role:admin');

    Route::put('pengaduan/update-validasi-kades/{pengaduan}', [PengaduanController::class, 'validasiKades'])
        ->name('pengaduan.validasi.kades')
        ->middleware('role:kades');

    Route::put('pengaduan/update-validasi-kadus/{pengaduan}', [PengaduanController::class, 'validasiKadus'])
        ->name('pengaduan.validasi.kadus')
        ->middleware('role:kadus_1|kadus_2|kadus_3|kadus_4');

    Route::resource('tanggapan', TanggapanPengaduanController::class);

    Route::get('/export-pdf', [ExportPengaduanController::class, 'export'])
        ->middleware('role:admin|kadus_1|kadus_2|kadus_3|kadus_4|kades');

    Route::get('/users', [UserController::class, 'index'])
        ->name('daftar.user')
        ->middleware('role:admin');

    Route::delete('/users/{user}', [UserController::class, 'destroy'])
        ->name('delete.user')
        ->middleware('role:admin');

    Route::resource('template-berkas', TemplateBerkasController::class)
        ->parameters(['template-berkas' => 'templateBerkas'])
        ->names('template-berkas');

    Route::resource('permohonan-surat', PermohonanSuratController::class)
        ->parameters(['permohonan-surat' => 'permohonanSurat'])
        ->names('permohonan-surat');
        // ->middleware('role:masyarakat');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function (DashboardService $dashboardService) {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $role = $user->getRoleNames()->first();

        $viewAdmin = 'menu/dashboard/admin/dashboard';

        if ($role === 'masyarakat') {
            return Inertia::render($viewAdmin, $dashboardService->getDashboardData(userId: $user->id));
        }

        if (in_array($role, ['admin', 'kades'])) {
            return Inertia::render($viewAdmin, $dashboardService->getDashboardData());
        }

        $kadus_ID = Auth::user()->id;

        if ($kadus_ID) {
            return Inertia::render($viewAdmin, $dashboardService->getDashboardData(kadus_ID: $kadus_ID));
        }

        abort(403, 'Role tidak dikenali');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
