<?php
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FieldsController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\RejectReasonController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ValuesController;
use App\Http\Controllers\PackageController;
use Illuminate\Support\Facades\Route;


Route::get('/', [LoginController::class, 'login'])->name('login');

Route::post('/', [LoginController::class, 'login'])->name('login_post');

Route::group(['middleware' => 'auth'], function () {

    Route::get('/logout', [LoginController::class, 'logout'])->name('logout');

    Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');

    Route::group(['prefix' => 'user'], function () {
        Route::get('/', [UserController::class, 'user'])->name('user');
        Route::get('/{id}', [UserController::class, 'info'])->name('info');
        Route::get('/suspend/{id}', [UserController::class, 'suspend'])->name('suspend');
        Route::get('/suspended/{id}', [UserController::class, 'unsuspend'])->name('unsuspend');
        Route::get('/active/{id}', [UserController::class, 'active'])->name('active');
        Route::get('/deactive/{id}', [UserController::class, 'deactive'])->name('deactive');
        Route::get('/edit/{id}', [UserController::class, 'edit'])->name('show_Data');
        Route::post('/edit', [UserController::class, 'update']);
        Route::get('/elete/{id}', [UserController::class, 'delete'])->name('delete');
        Route::get('/filter/{action}', [UserController::class, 'user_filter'])->name('user_filter');
    });

    Route::group(['prefix' => 'category'], function () {
        Route::get('/add', [CategoryController::class, 'categories'])->name('categories');
        Route::post('/add', [CategoryController::class, 'categories']);
        Route::get('/list', [CategoryController::class, 'category_list'])->name('category_list');
        Route::get('/edit/{id}', [CategoryController::class, 'update_category'])->name('update_category');
        Route::post('/{id}/edit', [CategoryController::class, 'update_category'])->name('update_category_post');
        Route::get('/delete/{id}', [CategoryController::class, 'delete_category'])->name('delete_category');
        Route::get('/filter/{action}', [CategoryController::class, 'category_filter'])->name('category_filter');
    });

    Route::group(['prefix' => 'country'], function () {
        Route::get('/', [LocationController::class, 'country_list'])->name('country_list');
        Route::get('/add', [LocationController::class, 'add_country'])->name('country');
        Route::post('/add', [LocationController::class, 'add_country']);
        Route::get('/update/{id}', [LocationController::class, 'update_country'])->name('update_country');
        Route::post('/update/{id}', [LocationController::class, 'update_country']);
    });

    Route::group(['prefix' => 'region'], function () {
        Route::get('/', [RegionController::class, 'region_list'])->name('region_list');
        Route::get('/add', [RegionController::class, 'add_region'])->name('region');
        Route::post('/add', [RegionController::class, 'add_region']);
        Route::get('/update/{id}', [RegionController::class, 'update_region'])->name('update_region');
        Route::post('/update/{id}', [RegionController::class, 'update_region'])->name('update_region');
        Route::get('/delete/{id}', [RegionController::class, 'delete_region'])->name('delete_region');
    });

    Route::group(['prefix' => 'city'], function () {
        Route::get('/city', [CityController::class, 'city_list'])->name('city_list');
        Route::get('/add', [CityController::class, 'add_city'])->name('city');
        Route::get('/add/{country_id}', [CityController::class, 'with_country'])->name('with_country');
        Route::post('/add', [CityController::class, 'add_city']);
        Route::get('/update/{id}', [CityController::class, 'update_city'])->name('update_city');
        Route::post('/update/{id}', [CityController::class, 'update_city'])->name('update_city');
        Route::get('/delete/{id}', [CityController::class, 'delete_city'])->name('delete_city');
    });

    Route::group(['prefix' => 'fields'], function () {
        Route::get('/', [FieldsController::class, 'fields'])->name('fields');
        Route::post('/', [FieldsController::class, 'fields'])->name('fields');
        Route::get('/list', [FieldsController::class, 'field_list'])->name('field_list');
        Route::get('/edit/{id}', [FieldsController::class, 'field_edit'])->name('field_edit');
        Route::post('/edit/{id}', [FieldsController::class, 'field_edit_post'])->name('field_edit_post');
        Route::get('/delete/{id}', [FieldsController::class, 'delete_field'])->name('delete_field');
        Route::get('/edit/{label}/{value}/{id}/updateicon', [FieldsController::class, 'update_icon'])->name('update_icon');
        Route::post('/edit/{label}/{value}/{id}/updateicon', [FieldsController::class, 'update_icon_post'])->name('update_icon_post');
        Route::get('/edit/values/delete/{id}', [FieldsController::class, 'delete_value'])->name('delete_value');
        Route::get('/edit/{field_id}/icon/delete/{icon_id}', [FieldsController::class, 'delete_field_icon'])->name('delete_field_icon');
    });

    Route::group(['prefix' => 'values'], function () {
        Route::get('/', [ValuesController::class, 'values'])->name('values');
        Route::get('/add', [ValuesController::class, 'values_add'])->name('values_add');
        Route::post('/add', [ValuesController::class, 'values_add']);
        Route::get('/update/{id}', [ValuesController::class, 'values_update'])->name('values_update');
        Route::post('/update/{id}', [ValuesController::class, 'values_update']);
        Route::get('/delete/{id}', [ValuesController::class, 'delete_value'])->name('delete_value');
        Route::get('/update/{value_id}/icon/delete/{icon_id}', [ValuesController::class, 'delete_value_icon'])->name('delete_value_icon');
    });

    Route::group(['prefix' => 'products'], function () {
        Route::get('/reject_reason', [RejectReasonController::class, 'reject_reason_list'])->name('reject_reason_list');
        Route::post('/reject_reason/add', [RejectReasonController::class, 'reject_reason_add'])->name('reject_reason_add');
        Route::post('/reject_reason/edit/{id}', [RejectReasonController::class, 'reject_reason_edit'])->name('reject_reason_edit');
        Route::get('/reject_reason/delete/{id}', [RejectReasonController::class, 'reject_reason_delete'])->name('reject_reason_delete');
    });

    Route::group(['prefix' => 'products'], function () {
        Route::post('/update/{id}', [ProductsController::class, 'update_product'])->name('update_product');
        Route::get('/delete/media/{id}', [ProductsController::class, 'delete_media'])->name('delete_media');
        Route::get('/{list_type}', [ProductsController::class, 'products_list'])->name('products_list');
        Route::get('/show/{id}', [ProductsController::class, 'show_product'])->name('show_product');
        Route::get('/status/{action}/{list_type}', [ProductsController::class, 'filter'])->name('filter');
        Route::get('/delete/{id}', [ProductsController::class, 'delete_product'])->name('delete_product');
        Route::get('/approve/{id}', [ProductsController::class, 'approve_product'])->name('approve_product');
        Route::post('/reject/{id}', [ProductsController::class, 'reject_product'])->name('reject_product');
    });
    Route::group(['prefix' => 'pacakge'], function () {
        Route::get('/', [PackageController::class, 'add_packages'])->name('add_packages');   
        Route::post('/', [PackageController::class, 'add_packages'])->name('add_packages');  
    });

    Route::group(['prefix' => 'settings'], function () {
        Route::get('/', [SettingsController::class, 'settings'])->name('settings');
        Route::post('/add', [SettingsController::class, 'settings_post'])->name('settings_post');
    });

});
