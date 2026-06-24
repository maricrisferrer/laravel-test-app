<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Middleware\AdminAuth;

// Public CRUD endpoints (no admin): create, list, show, update, delete
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

// Admin login
Route::post('/admin/login', [AdminController::class, 'login']);

// Admin-only route to view all users including hashed passwords
Route::middleware([AdminAuth::class])->group(function () {
    Route::get('/admin/users', [UserController::class, 'adminIndex']);
});
