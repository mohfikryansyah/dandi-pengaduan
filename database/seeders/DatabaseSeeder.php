<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $masyarakatRole = Role::create(['name' => 'masyarakat']);
        $kadesRole = Role::create(['name' => 'kades']);
        $adminRole = Role::create(['name' => 'admin']);
        $kadus1Role = Role::create(['name' => 'kadus_1']);
        $kadus2Role = Role::create(['name' => 'kadus_2']);
        $kadus3Role = Role::create(['name' => 'kadus_3']);
        $kadus4Role = Role::create(['name' => 'kadus_4']);

        User::factory()->create([
            'name' => 'Admin',
            'username' => 'admin',
            'avatar' => 'avatars/fiqriansyah.jpg',
            'email' => 'admin@gmail.com',
        ])->assignRole($adminRole);

        User::factory()->create([
            'name' => 'masyarakat',
            'username' => 'masyarakat',
            'dusun' => 'Dusun Ilomata',
            'avatar' => 'avatars/fiqriansyah.jpg',
            'email' => 'masyarakat@gmail.com',
        ])->assignRole($masyarakatRole);

        User::factory()->create([
            'name' => 'dusun 1',
            'username' => 'dusun1',
            'avatar' => 'avatars/fiqriansyah.jpg',
            'email' => 'dusun1@gmail.com',
        ])->assignRole($kadus1Role);

        User::factory()->create([
            'name' => 'dusun 2',
            'username' => 'dusun2',
            'avatar' => 'avatars/fiqriansyah.jpg',
            'email' => 'dusun2@gmail.com',
        ])->assignRole($kadus2Role);

        User::factory()->create([
            'name' => 'dusun 3',
            'username' => 'dusun3',
            'avatar' => 'avatars/fiqriansyah.jpg',
            'email' => 'dusun3@gmail.com',
        ])->assignRole($kadus3Role);

        User::factory()->create([
            'name' => 'dusun 4',
            'username' => 'dusun4',
            'avatar' => 'avatars/fiqriansyah.jpg',
            'email' => 'dusun4@gmail.com',
        ])->assignRole($kadus4Role);

        User::factory()->create([
            'name' => 'kades',
            'username' => 'kades',
            'avatar' => 'avatars/fiqriansyah.jpg',
            'email' => 'kades@gmail.com',
        ])->assignRole($kadesRole);
    }
}
