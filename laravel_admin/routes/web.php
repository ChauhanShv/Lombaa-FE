<?php
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\FieldsController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ValuesController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LoginController::class, 'login'])->name('login');

Route::post('/', [LoginController::class, 'login'])->name('login_post');

Route::group(['middleware' => 'auth'], function () {

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

    Route::get('/country', [LocationController::class, 'country_list'])->name('country_list');
    Route::get('/country/add', [LocationController::class, 'add_country'])->name('country');
    Route::post('/country/add', [LocationController::class, 'add_country']);
    Route::get('/country/update/{id}', [LocationController::class, 'update_country'])->name('update_country');
    Route::post('/country/update/{id}', [LocationController::class, 'update_country']);

    Route::get('/region', [RegionController::class, 'region_list'])->name('region_list');
    Route::get('/region/add', [RegionController::class, 'add_region'])->name('region');
    Route::post('/region/add', [RegionController::class, 'add_region']);
    Route::get('/region/update/{id}', [RegionController::class, 'update_region'])->name('update_region');
    Route::post('/region/update/{id}', [RegionController::class, 'update_region'])->name('update_region');

    Route::get('/city', [CityController::class, 'city_list'])->name('city_list');
    Route::get('/city/add', [CityController::class, 'add_city'])->name('city');
    Route::post('/city/add', [CityController::class, 'add_city']);
    Route::get('/city/update/{id}', [CityController::class, 'update_city'])->name('update_city');
    Route::post('/city/update/{id}', [CityController::class, 'update_city'])->name('update_city');

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

    Route::get('/products', [ProductsController::class, 'products_list'])->name('products_list');
    Route::get('/products/{action}/{id}', [ProductsController::class, 'approve_reject'])->name('approve_reject');

});
