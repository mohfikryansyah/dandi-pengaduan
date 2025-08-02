<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Support\Facades\Storage;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'username',
        'avatar',
        'dusun',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'roles'
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function pengaduans(): HasMany
    {
        return $this->hasMany(Pengaduan::class);
    }

    public function tanggapans(): HasMany
    {
        return $this->hasMany(TanggapanPengaduan::class);
    }

    /**
     * Get user's first role name
     * 
     * @return string|null
     */
    public function getFirstRole()
    {
        return $this->getRoleNames()->first();
    }

    /**
     * Get current authenticated user's role
     * 
     * @return string|null
     */
    public static function getCurrentUserRole()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        return $user ? $user->getRoleNames()->first() : null;
    }

    /**
     * Get current user with role
     * 
     * @return array
     */
    public static function getCurrentUserWithRole()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        return [
            'user' => $user,
            'role' => $user ? $user->getRoleNames()->first() : null
        ];
    }
}
