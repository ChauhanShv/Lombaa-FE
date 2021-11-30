<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FieldsController;
use App\Http\Controllers\ValuesController;

use App\Http\Middleware\Auth;


Route::get('/', [LoginController::class, 'login'])->name('login');
 
Route::post('/', [LoginController::class, 'login'])->name('login_post');

Route::group(['middleware' => 'auth'], function(){

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
    
    Route::get('/category/add', [CategoryController::class, 'categories'])->name('categories');
    Route::post('/category/add', [CategoryController::class, 'categories']);
    Route::get('/category/list', [CategoryController::class, 'category_list'])->name('category_list');
    Route::get('/category/edit/{id}', [CategoryController::class, 'update_category'])->name('update_category');
    Route::post('/category/{id}/edit', [CategoryController::class, 'update_category'])->name('update_category_post');

    Route::get('/fields', [FieldsController::class, 'fields'])->name('fields');
    Route::post('/fields', [FieldsController::class, 'fields'])->name('fields');
    Route::get('/fieldslist', [FieldsController::class, 'field_list'])->name('field_list');
    Route::get('/fieldedit/{id}', [FieldsController::class, 'field_edit'])->name('field_edit');
    Route::post('/fieldedit/{id}', [FieldsController::class, 'field_edit'])->name('field_edit_post');
    Route::get('/fieldedit/{label}/{value}/{id}/updateicon', [FieldsController::class, 'update_icon'])->name('update_icon');
    Route::post('/fieldedit/{label}/{value}/{id}/updateicon', [FieldsController::class, 'update_icon_post'])->name('update_icon_post');

    Route::get('/values', [ValuesController::class, 'values'])->name('values');
    Route::get('/values/add', [ValuesController::class, 'values_add'])->name('values_add');
    Route::post('/values/add', [ValuesController::class, 'values_add']);
    Route::get('/values/update/{id}', [ValuesController::class, 'values_update'])->name('values_update');
    Route::post('/values/update/{id}', [ValuesController::class, 'values_update']);
});