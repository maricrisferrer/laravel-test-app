<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    // Simple login endpoint that checks hardcoded credentials and returns a token
    public function login(Request $request)
    {
        $data = $request->only(['email','password']);
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        $adminEmail = env('ADMIN_EMAIL', 'admin@example.com');
        $adminPassword = env('ADMIN_PASSWORD', 'adminpassword');

        if ($data['email'] === $adminEmail && $data['password'] === $adminPassword) {
            return response()->json(['token' => env('ADMIN_TOKEN', 'admintoken123')]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}
