<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PermohonanSurat extends Model
{
    use HasUuids;
    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;
    protected $appends = ['tanggal_formatted'];

    protected $casts = [
        'data_form' => 'array',
    ];

    protected function tanggalFormatted(): Attribute
    {
        return Attribute::get(fn() => Carbon::parse($this->created_at)->translatedFormat('d F Y'));
    }

    public function pemohon(): BelongsTo
    {
        return $this->belongsTo(User::class, 'pemohon_id');
    }

    public function templateSurat(): BelongsTo
    {
        return $this->belongsTo(TemplateBerkas::class, 'template_surat_id');
    }
}
