<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BerkasPengaduan extends Model
{
    /** @use HasFactory<\Database\Factories\BerkasPengaduanFactory> */
    use HasFactory, HasUuids;

    protected $guarded = ['id'];
    protected $appends = [
        'size',
    ];

    public function getSizeAttribute()
    {
        return Storage::disk('public')->size($this->path_berkas);
    }

    public function pengaduan(): BelongsTo
    {
        return $this->belongsTo(Pengaduan::class);
    }
}
