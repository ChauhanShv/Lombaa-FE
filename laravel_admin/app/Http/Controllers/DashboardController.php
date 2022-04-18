<?php

namespace App\Http\Controllers;

use App\Models\Products;
use App\Models\Users;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function dashboard()
    {
        $users_count = Users::get()->count();
        $products_count = Products::get()->count();
        $sold_products_count = Products::whereNotNull('soldAt')->get()->count();

        $date = Carbon::now()->subDays(7);
        $users_in_one_week = Users::where('createdAt', '>=', $date)->get()->count();

        return view('index', ['users_count' => $users_count, 'products_count' => $products_count, 'sold_products_count' => $sold_products_count, 'users_in_one_week' => $users_in_one_week]);
    }
}
