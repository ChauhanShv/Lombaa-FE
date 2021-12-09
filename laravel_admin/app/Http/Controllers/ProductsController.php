<?php

namespace App\Http\Controllers;

use App\Models\Products;

class ProductsController extends Controller
{
    public function products_list($id)
    {
        if ($id == 'all') {
            $products = Products::paginate(30);
            return view('products.list', ['products' => $products]);
        } else {
            $products = Products::where('slug', $id)->paginate(30);
            return view('products.list', ['products' => $products]);
        }
    }

    public function approve_reject($action, $id)
    {
        if ($action == 'approve') {
            $approve = ['is_Approved' => '1'];
            Products::where('id', $id)->update($approve);
            return redirect()->route('products_list', ['id' => 'all'])->with('response', ['status' => 'success', 'message' => 'Approved']);
        } elseif ($action == 'reject') {
            $reject = ['is_Approved' => '0'];
            Products::where('id', $id)->update($reject);
            return redirect()->route('products_list', ['id' => 'all'])->with('response', ['status' => 'success', 'message' => 'Rejected']);
        }
    }

    public function filter($action)
    {
        if ($action == 'under_review') {
            $products = Products::where('is_Approved', '=', '0')->paginate(30);
            return view('products.list', ['products' => $products]);
        } elseif ($action == 'active') {
            $products = Products::where('is_Approved', '=', '1')->paginate(30);
            return view('products.list', ['products' => $products]);
        } elseif ($action == 'declined') {
            $products = Products::paginate(30);
            return view('products.list', ['products' => $products]);
        } elseif ($action == 'expired') {
            $products = Products::paginate(30);
            return view('products.list', ['products' => $products]);
        } elseif ($action == 'sold') {
            $products = Products::where('is_Sold', '=', '1')->paginate(30);
            return view('products.list', ['products' => $products]);
        }
    }
}
