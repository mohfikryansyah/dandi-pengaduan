<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StatusPengaduan extends Model
{
    /** @use HasFactory<\Database\Factories\StatusPengaduanFactory> */
    use HasFactory, HasUuids;

    protected $guarded = ['id'];
    protected $attributes = ['status' => 'Menunggu verifikasi'];

    public function pengaduan(): BelongsTo
    {
        return $this->belongsTo(Pengaduan::class);
    }
}
