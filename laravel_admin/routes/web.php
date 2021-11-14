<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;

Route::get('/', [LoginController::class, 'login'])->name('login');

Route::post('/', [LoginController::class, 'login']);

Route::get('/logout', [LoginController::class, 'logout'])->name('logout');

Route::get('/user', [UserController::class, 'user'])->name('user');

Route::get('/user/{id}', [UserController::class, 'info'])->name('info');

Route::get('/user/suspend/{id}', [UserController::class, 'suspend'])->name('suspend');

Route::get('/user/suspended/{id}', [UserController::class, 'unsuspend'])->name('unsuspend');

Route::get('/user/active/{id}', [UserController::class, 'active'])->name('active');

Route::get('/user/deactive/{id}', [UserController::class, 'deactive'])->name('deactive');

Route::get('/user/edit/{id}', [UserController::class, 'edit'])->name('show_Data');

Route::post('/user/edit', [UserController::class, 'update']);

Route::get('/user/delete/{id}', [UserController::class, 'delete'])->name('delete');