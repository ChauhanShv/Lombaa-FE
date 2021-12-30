<?php

namespace App\Http\Controllers;

use App\Models\ProductFields;
use App\Models\Products;
use Carbon\Carbon;

class ProductsController extends Controller
{
    public function products_list($id)
    {
        if ($id === 'all') {
            $products = Products::with('category', 'location', 'location.city', 'location.region', 'location.country')->paginate(30);

            return view('products.list', ['products' => $products]);
        } else {
            $products = Products::with('category')->where('userId', $id)->paginate(30);

            return view('products.list', ['products' => $products]);
        }
    }

    public function show_product($id)
    {
        $data = ProductFields::with('field', 'product')->where('productId', $id)->first();

        return view('products.show', ['data' => $data]);
    }

    public function delete_product($id)
    {
        Products::find($id)->delete();
        return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Product deleted successfully']);

    }

    public function approve_reject($action, $id)
    {
        if ($action === 'approve') {
            $data = [
                'approvedAt' => Carbon::now(),
                'expiry' => Carbon::now()->addHours(72),
            ];

            Products::where('id', $id)->update($data);

            return redirect()->route('products_list', ['id' => 'all'])->with('response', ['status' => 'success', 'message' => 'Approved']);
        } elseif ($action == 'reject') {
            $data = ['rejectedAt' => Carbon::now()];

            Products::where('id', $id)->update($data);

            return redirect()->route('products_list', ['id' => 'all'])->with('response', ['status' => 'success', 'message' => 'Rejected']);
        }
    }

    public function filter($action)
    {
        if ($action === 'under_review') {
            $products = Products::whereNull('approvedAt')
                ->whereNull('rejectedAt')
                ->paginate(30);

            return view('products.list', ['products' => $products]);
        } elseif ($action === 'active') {
            $products = Products::whereNotNull('approvedAt')->paginate(30);

            return view('products.list', ['products' => $products]);
        } elseif ($action === 'declined') {
            $products = Products::whereNotNull('rejectedAt')->paginate(30);

            return view('products.list', ['products' => $products]);
        } elseif ($action === 'expired') {
            $products = Products::whereDate('expiry', '<=', Carbon::now())->paginate(30);

            return view('products.list', ['products' => $products]);
        } elseif ($action === 'sold') {
            $products = Products::whereNotNull('soldAt')->paginate(30);

            return view('products.list', ['products' => $products]);
        }
    }
}
