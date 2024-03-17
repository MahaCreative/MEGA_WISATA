<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        return inertia('Profile/Index');
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $user = $request->user();
        $password = $user->password;
        $email = $user->email;
        $request->validate([
            'name' => 'required|string|min:4|max:255',
        ]);
        if ($request->email_baru) {
            $request->validate([
                'email_baru' => 'required|string|max:255|email',
            ]);
            $email = $request->email_baru;
        }
        if ($request->password) {
            $request->validate([
                'password' => 'required|string|min:6',
            ]);
            $password = bcrypt($request->password);
        }
        $user->update([
            'name' => $request->name,
            'email' => $email,
            'password' => $password,
        ]);
        return redirect()->back()->with(['type' => 'success', 'message' => 'Berhasil memperbaharui profile']);
    }
}
