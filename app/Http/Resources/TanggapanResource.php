<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TanggapanResource extends JsonResource
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
            'user' => new AuthUserResource($this->whenLoaded('user')),
            'pengaduan' => new PengaduanResource($this->whenLoaded('pengaduan')),
            'tanggapan' => $this->tanggapan,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
