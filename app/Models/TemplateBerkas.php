<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TemplateBerkas extends Model
{
    /** @use HasFactory<\Database\Factories\TemplateBerkasFactory> */
    use HasFactory, HasUuids;
    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    protected $appends = ['tanggal_formatted'];

    protected $casts = [
        'form_fields' => 'array',
    ];

    public $incrementing = false;

    protected function tanggalFormatted(): Attribute
    {
        return Attribute::get(fn() => Carbon::parse($this->created_at)->locale('id')->translatedFormat('d F Y'));
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
