<?php

namespace App\Http\Controllers;

use App\Models\Products;

class ProductsController extends Controller
{
    public function products_list()
    {
        $products = Products::paginate(30);
        return view('products.list', ['products' => $products]);
    }

    public function approve_reject($action, $id)
    {
        if ($action == 'approve') {
            $approve = ['is_Approved' => '1'];
            Products::where('id', $id)->update($approve);
            return redirect()->route('products_list')->with('response', ['status' => 'success', 'message' => 'Approved']);
        } elseif ($action == 'reject') {
            $reject = ['is_Approved' => '0'];
            Products::where('id', $id)->update($reject);
            return redirect()->route('products_list')->with('response', ['status' => 'success', 'message' => 'Rejected']);
        }
    }
}
