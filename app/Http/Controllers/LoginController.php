<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function index(Request $request)
    {
        return inertia('Login');
    }
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'email' => 'required|email|min:6',
            'password' => 'required|string|min:6',
        ]);
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            return redirect()->route('home')->with(['type' => 'success', 'message' => 'Login Successfully']);
        }
        return redirect()->route('login')->with(['type' => 'error', 'message' => 'mungkin email atau password salah']);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        return redirect()->route('home')->with(['type' => 'success', 'message' => 'anda telah berhasil logout']);
    }
}
