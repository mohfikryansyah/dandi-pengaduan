<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PengaduanResource extends JsonResource
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
            'isi' => $this->isi,
            'diteruskan_ke' => $this->diteruskan_ke,
            'validasi_kades' => $this->validasi_kades,
            'created_at' => $this->created_at,
            'user' => new AuthUserResource($this->whenLoaded('user')),
            'berkas' => $this->berkas,
            'latest_status' => $this->latestStatus,
            'tanggapans' => TanggapanResource::collection($this->whenLoaded('tanggapans')),
        ];
    }
}
