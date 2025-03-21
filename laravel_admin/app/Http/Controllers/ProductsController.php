<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\ProductFields;
use App\Models\ProductMedia;
use App\Models\Products;
use App\Models\RejectReason;
use App\Models\Settings;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function products_list($list_type)
    {
        if ($list_type !== 'all') {
            $products = Products::with('category', 'location', 'location.city', 'location.region', 'location.country', 'user')->where('userId', $list_type)->paginate(30);
        } else {
            $products = Products::with('category', 'location', 'location.city', 'location.region', 'location.country', 'user')->paginate(30);
        }

        $reject_reasons = RejectReason::get();

        return view('products.list', ['products' => $products, 'reject_reasons' => $reject_reasons, 'list_type' => $list_type]);
    }

    public function show_product($id)
    {
        $product_data = Products::with('category', 'user', 'favourite', 'location', 'location.city', 'location.region', 'location.country')->where('id', $id)->first();

        if ($product_data->category->parentId !== null) {
            $parent_category = Category::where('id', $product_data->category->parentId)->first();
        } else {
            $parent_category = 'null';
        }

        $sub_categories = Category::where('parentId', $product_data->category->parentId)->get();

        $product_fields_data = ProductFields::with('field')->where('ProductId', $id)->get();
        $reject_reasons = RejectReason::get();
        $product_media = ProductMedia::with('file')->where('productId', $id)->get();

        return view('products.show', ['product_data' => $product_data, 'product_fields_data' => $product_fields_data, 'reject_reasons' => $reject_reasons, 'product_media' => $product_media, 'parent_category' => $parent_category, 'sub_categories' => $sub_categories]);
    }

    public function delete_product($id)
    {
        Products::find($id)->delete();
        return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Product deleted successfully']);
    }

    public function approve_product(Request $request, $id)
    {
        $stored_expiry_date = Settings::where('key_name', 'ad_expiry_days')->first();

        $data = [
            'approvedAt' => Carbon::now(),
            'expiry' => Carbon::now()->addHours($stored_expiry_date->value * 24),
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
            'rejectDescription' => $request->description,
            'approvedAt' => null,
            'expiry' => null,
        ];

        Products::where('id', $id)->update($data);

        return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Rejected']);
    }

    public function filter($action, $list_type)
    {
        if ($action === 'under_review') {
            if ($list_type !== 'all') {
                $products = Products::with('category', 'location', 'location.city', 'location.region', 'location.country', 'user')
                    ->whereNull('approvedAt')
                    ->whereNull('rejectedAt')
                    ->where('userId', $list_type)
                    ->paginate(30);
            } else {
                $products = Products::with('category', 'location', 'location.city', 'location.region', 'location.country', 'user')
                    ->whereNull('approvedAt')
                    ->whereNull('rejectedAt')
                    ->paginate(30);
            }

            $reject_reasons = RejectReason::get();

            return view('products.list', ['products' => $products, 'reject_reasons' => $reject_reasons, 'list_type' => $list_type]);
        } elseif ($action === 'active') {
            if ($list_type !== 'all') {
                $products = Products::with('category', 'location', 'location.city', 'location.region', 'location.country', 'user')
                    ->whereNotNull('approvedAt')
                    ->where('userId', $list_type)
                    ->paginate(30);
            } else {
                $products = Products::with('category', 'location', 'location.city', 'location.region', 'location.country', 'user')
                    ->whereNotNull('approvedAt')
                    ->paginate(30);
            }

            $reject_reasons = RejectReason::get();

            return view('products.list', ['products' => $products, 'reject_reasons' => $reject_reasons, 'list_type' => $list_type]);
        } elseif ($action === 'declined') {
            if ($list_type !== 'all') {
                $products = Products::with('category', 'location', 'location.city', 'location.region', 'location.country', 'user')
                    ->whereNotNull('rejectedAt')
                    ->where('userId', $list_type)
                    ->paginate(30);
            } else {
                $products = Products::with('category', 'location', 'location.city', 'location.region', 'location.country', 'user')
                    ->whereNotNull('rejectedAt')
                    ->paginate(30);
            }

            $reject_reasons = RejectReason::get();

            return view('products.list', ['products' => $products, 'reject_reasons' => $reject_reasons, 'list_type' => $list_type]);
        } elseif ($action === 'expired') {
            if ($list_type !== 'all') {
                $products = Products::with('category', 'location', 'location.city', 'location.region', 'location.country', 'user')
                    ->whereDate('expiry', '<=', Carbon::now())
                    ->where('userId', $list_type)
                    ->paginate(30);
            } else {
                $products = Products::with('category', 'location', 'location.city', 'location.region', 'location.country', 'user')
                    ->whereDate('expiry', '<=', Carbon::now())
                    ->paginate(30);
            }

            $reject_reasons = RejectReason::get();

            return view('products.list', ['products' => $products, 'reject_reasons' => $reject_reasons, 'list_type' => $list_type]);
        } elseif ($action === 'sold') {
            if ($list_type !== 'all') {
                $products = Products::with('category', 'location', 'location.city', 'location.region', 'location.country', 'user')
                    ->whereNotNull('soldAt')
                    ->where('userId', $list_type)
                    ->paginate(30);
            } else {
                $products = Products::with('category', 'location', 'location.city', 'location.region', 'location.country', 'user')
                    ->whereNotNull('soldAt')
                    ->paginate(30);
            }

            $reject_reasons = RejectReason::get();

            return view('products.list', ['products' => $products, 'reject_reasons' => $reject_reasons, 'list_type' => $list_type]);
        }
    }

    public function update_product(Request $request, $id)
    {
        $data = [
            'title' => $request->title,
            'description' => $request->description,
            'sub_category' => $request->sub_category,
        ];

        if (count($request->all()) > 0) {

            $all_fields = ProductFields::with('field')->where('productId', $id)->get();

            if (count($all_fields) > 0) {
                foreach ($all_fields as $single_field) {
                    if ($single_field->field->fieldType == 'description') {
                        ProductFields::where('id', $single_field->id)->update(['value' => $data['description']]);
                    }
                    if ($single_field->field->fieldType == 'title') {
                        ProductFields::where('id', $single_field->id)->update(['value' => $data['title']]);
                    }
                }
            }

            if ($request->has('sub_category')) {
                Products::where('id', $id)->update(['categoryId' => $request->sub_category]);
            }

            return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Product updated successfully']);
        } else {
            return redirect()->back()->with('response', ['status' => 'unsuccessful', 'message' => 'Something went wrong']);
        }

    }

    public function delete_media($id)
    {
        $delete = [
            'deletedAt' => Carbon::now(),
        ];

        ProductMedia::where('id', $id)->delete($delete);

        return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Media deleted successfully']);
    }
}
