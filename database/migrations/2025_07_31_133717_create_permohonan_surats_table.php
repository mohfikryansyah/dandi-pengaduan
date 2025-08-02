<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('permohonan_surats', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('pemohon_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUuid('template_surat_id')->constrained('template_berkas')->cascadeOnNull();
            $table->string('judul_surat');
            // $table->boolean('wajib_nomor_surat')->default(true);
            $table->string('nomor_surat')->nullable();
            $table->string('path_surat');
            $table->enum('status', ['Disetujui', 'Ditolak', 'Pending'])->default('Pending');
            $table->string('keterangan')->nullable();
            $table->json('data_form')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permohonan_surats');
    }
};
