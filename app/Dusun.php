<?php

namespace App;

enum Dusun: string
{
    case DUSUN1 = 'Dusun Ilomata';
    case DUSUN2 = 'Dusun Tamboo';
    case DUSUN3 = 'Dusun Bongo';
    case DUSUN4 = 'Dusun Bongo 2';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
