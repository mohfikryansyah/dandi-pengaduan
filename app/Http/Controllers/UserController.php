<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->get()
            ->filter(function ($user) {
                return !$user->hasRole('admin');
            })
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'username' => $user->username,
                    'email' => $user->email,
                    'avatar' => $user->avatar,
                    'created_at' => $user->created_at,
                    'role_names' => $user->getRoleNames(),
                ];
            })
            ->values();
        return Inertia::render('menu/pengguna/index', compact('users'));
    }

    public function destroy(User $user)
    {
        $user->delete();
        return back();
    }
}
