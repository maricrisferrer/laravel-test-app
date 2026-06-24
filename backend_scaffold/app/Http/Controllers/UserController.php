<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\JsonStorage;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    protected $storage;

    public function __construct(JsonStorage $storage)
    {
        $this->storage = $storage;
    }

    // public list for create/read/update/delete

    public function index()
    {
        $users = array_values($this->storage->all());
        // Hide passwords in public listing
        foreach ($users as &$u) { unset($u['password']); }
        return response()->json($users);
    }

    public function show($id)
    {
        $user = $this->storage->find($id);
        if (!$user) return response()->json(['message' => 'Not found'], 404);
        unset($user['password']);
        return response()->json($user);
    }

    public function store(Request $request)
    {
        $data = $request->only(['name','email','password']);
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string|min:4',
        ]);
        $data['password'] = Hash::make($data['password']);
        $user = $this->storage->create($data);
        unset($user['password']);
        return response()->json($user, 201);
    }

    public function update(Request $request, $id)
    {
        $existing = $this->storage->find($id);
        if (!$existing) return response()->json(['message'=>'Not found'], 404);
        $data = $request->only(['name','email','password']);
        $data = array_filter($data, function($v){ return $v !== null; });
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            $data['password'] = $existing['password'];
        }
        $data['name'] = $data['name'] ?? $existing['name'];
        $data['email'] = $data['email'] ?? $existing['email'];
        $updated = $this->storage->update($id, $data);
        unset($updated['password']);
        return response()->json($updated);
    }

    public function destroy($id)
    {
        $deleted = $this->storage->delete($id);
        if (!$deleted) return response()->json(['message'=>'Not found'], 404);
        return response()->json(['message'=>'Deleted']);
    }

    // Admin-only: view full users including hashed passwords
    public function adminIndex()
    {
        $users = array_values($this->storage->all());
        return response()->json($users);
    }
}
