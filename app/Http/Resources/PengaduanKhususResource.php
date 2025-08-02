<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PengaduanKhususResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'judul' => $this->judul,
            'kronologi' => $this->kronologi,
            'tempat_kejadian' => $this->tempat_kejadian,
            'waktu_kejadian' => $this->waktu_kejadian,
            'validasi_kades' => $this->validasi_kades,
            'created_at' => $this->created_at,
            'user' => new AuthUserResource($this->whenLoaded('user')),
            'berkas' => $this->berkas,
            'latest_status' => $this->latestStatus,
        ];
    }
}
