<?php

namespace App\Http\Controllers;

use App\Models\ProductFields;
use App\Models\Products;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function products_list($action)
    {
        $products = Products::with('category', 'location', 'location.city', 'location.region', 'location.country', 'user')->paginate(30);

        return view('products.list', ['products' => $products]);
    }

    public function show_product($id)
    {
        $product_data = Products::with('user', 'location', 'location.city', 'location.region', 'location.country')->where('id', $id)->first();
        $product_fields_data = ProductFields::with('field')->where('ProductId', $id)->get();
        return view('products.show', ['product_data' => $product_data, 'product_fields_data' => $product_fields_data]);
    }

    public function delete_product($id)
    {
        Products::find($id)->delete();
        return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Product deleted successfully']);
    }

    public function approve_product(Request $request, $id)
    {
        $data = [
            'approvedAt' => Carbon::now(),
            'expiry' => Carbon::now()->addHours(72),
            'rejectedAt' => null,
            'rejectReason' => null,
        ];

        Products::where('id', $id)->update($data);

        return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Approved']);
    }

    public function reject_product(Request $request, $id)
    {
        $data = [
            'rejectedAt' => Carbon::now(),
            'rejectReason' => $request->reason,
            'approvedAt' => null,
            'expiry' => null,
        ];

        Products::where('id', $id)->update($data);

        return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Rejected']);
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
