<?php

namespace App\Helpers;

use App\Dusun;

class DusunHelper
{
    public static function getDusunByRole(string $role): ?string
    {
        $roleDusunMap = [
            'kadus_1' => Dusun::DUSUN1->value,
            'kadus_2' => Dusun::DUSUN2->value,
            'kadus_3' => Dusun::DUSUN3->value,
            'kadus_4' => Dusun::DUSUN4->value,
        ];

        return $roleDusunMap[$role] ?? null;
    }
}
