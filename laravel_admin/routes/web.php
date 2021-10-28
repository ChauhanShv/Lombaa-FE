<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('test');
// });
// Route::get('/', [TestController::class, 'test']);
Route::get('/', [LoginController::class, 'login']);

Route::post('/', [LoginController::class, 'login']);

Route::get('/user', [UserController::class, 'user'])->name('user');

Route::get('/user/{id}', [userController::class, 'info'])->name('info');




