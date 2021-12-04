<?php

namespace App\Http\Controllers;
use App\Models\Products;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function products_list(){
        $products = Products::paginate(30);
        return view('products.list', ['products' => $products]);
    }

    public function approve_reject($action, $id) {
        if($action == 'approve') {
            $approve = [ 'is_Approved' => '1']
            Products::update($id);
        }
    }
}