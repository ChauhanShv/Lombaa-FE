<?php

namespace App\Http\Controllers;

use App\Models\ProductFields;
use App\Models\Products;
use App\Models\RejectReason;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function products_list($action)
    {
        $products = Products::with('category', 'location', 'location.city', 'location.region', 'location.country', 'user')->paginate(30);
        $reject_reasons = RejectReason::get();

        return view('products.list', ['products' => $products, 'reject_reasons' => $reject_reasons]);
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
            'rejectReason' => $request->optionsRadios,
            'approvedAt' => null,
            'expiry' => null,
        ];

        Products::where('id', $id)->update($data);

        return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Rejected']);
    }

    public function filter($action)
    {
        if ($action === 'under_review') {
            $products = Products::with('category', 'location', 'location.city', 'location.region', 'location.country', 'user')
                ->whereNull('approvedAt')
                ->whereNull('rejectedAt')
                ->paginate(30);
            $reject_reasons = RejectReason::get();

            return view('products.list', ['products' => $products, 'reject_reasons' => $reject_reasons]);
        } elseif ($action === 'active') {
            $products = Products::with('category', 'location', 'location.city', 'location.region', 'location.country', 'user')
                ->whereNotNull('approvedAt')->paginate(30);
            $reject_reasons = RejectReason::get();

            return view('products.list', ['products' => $products, 'reject_reasons' => $reject_reasons]);
        } elseif ($action === 'declined') {
            $products = Products::with('category', 'location', 'location.city', 'location.region', 'location.country', 'user')
                ->whereNotNull('rejectedAt')->paginate(30);
            $reject_reasons = RejectReason::get();

            return view('products.list', ['products' => $products, 'reject_reasons' => $reject_reasons]);
        } elseif ($action === 'expired') {
            $products = Products::with('category', 'location', 'location.city', 'location.region', 'location.country', 'user')
                ->whereDate('expiry', '<=', Carbon::now())->paginate(30);
            $reject_reasons = RejectReason::get();

            return view('products.list', ['products' => $products, 'reject_reasons' => $reject_reasons]);
        } elseif ($action === 'sold') {
            $products = Products::with('category', 'location', 'location.city', 'location.region', 'location.country', 'user')
                ->whereNotNull('soldAt')->paginate(30);
            $reject_reasons = RejectReason::get();

            return view('products.list', ['products' => $products, 'reject_reasons' => $reject_reasons]);
        }
    }
}
