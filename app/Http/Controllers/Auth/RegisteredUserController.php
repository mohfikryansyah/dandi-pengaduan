<?php

namespace App\Http\Controllers\Auth;

use App\Dusun;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // dd($request->all());
        $request->validate([
            'name' => 'required|string|max:255',
            'dusun' => ['required', 'string', Rule::in(Dusun::values())],
            'username' => 'required|regex:/^\S+$/|max:16|unique:' . User::class,
            'avatar' => 'nullable|file|image|mimes:jpg,jpeg,png|max:1024',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ], [
            'username.regex' => 'Username tidak boleh mengandung spasi!'
        ]);

        // Store the avatar file
        if ($request->hasFile('avatar')) {
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
        }

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'dusun' => $request->dusun,
            'avatar' => $avatarPath ?? null,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ])->assignRole('masyarakat');

        event(new Registered($user));

        Auth::login($user);

        return to_route('dashboard');
    }
}
