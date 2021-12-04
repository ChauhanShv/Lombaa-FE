<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CategoryField;
use App\Models\Fields;
use App\Models\Files;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Str;

class CategoryController extends Controller
{
    public function categories(Request $request)
    {
        if ($request->isMethod('post')) {
            $rules = [
                'name' => 'required|regex:/^[\s\w-]*$/',
                'description' => 'required',
                'image' => 'required',
                'fields' => 'required',
            ];

            $messages = [
                'name.required' => 'Name is required',
                'description.required' => 'Description is required',
                'image.required' => 'Image is required',
                'fields.required' => 'Fields are required',
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }

            $image_name = Str::uuid() . '.' . $request->file('image')->getClientOriginalName();
            // $path = Storage::disk('s3')->put('images', $request->image);
            // $image_path = Storage::disk('s3')->url($path);
            $image_mime = $request->file('image')->getClientMimeType();
            $image_ext = $request->file('image')->extension();

            $file_data = [
                'id' => Str::uuid(),
                'key_name' => $image_name,
                'extension' => $image_ext,
                'name' => $image_name,
                'mime' => $image_mime,
                'relative_path' => '',
                // 'absolute_path'=> $image_path,
                'absolute_path' => 'https://lomba-task-temp.s3.ap-south-1.amazonaws.com/images/Djehr3diIDdqjo8Wf2JhFbZC70M9w1RZ0xb9VFH4.png',
                'location' => 's3',
                'createdAt' => Carbon::now(),
                'updatedAt' => Carbon::now(),
            ];

            $send_file_data = Files::insert($file_data);

            $category_id = Str::uuid();
            $data = [
                'id' => $category_id,
                'name' => $request->name,
                'description' => $request->description,
                'iconId' => $file_data['id'],
                'isPopular' => isset($request->popular) ? 1 : 0,
                'isActive' => isset($request->active) ? 1 : 0,
                'parentId' => $request->product ? $request->product : null,
                'createdAt' => Carbon::now(),
                'updatedAt' => Carbon::now(),
            ];

            Category::insertGetId($data);

            if ($data) {
                $category_fields = array();

                foreach ($request->input('fields') as $field) {
                    $category_field = array();

                    $category_field['categoryId'] = $category_id;
                    $category_field['fieldId'] = $field;
                    array_push($category_fields, $category_field);
                }

                $send_category_fields = CategoryField::insert($category_fields);

                return redirect()->route('category_list')->with('response', ['status' => 'success', 'message' => 'Category added successfully']);
            } else {
                return redirect()->route('category_list')->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);
            }
        } else {
            $fields = Fields::get();
            $categories = Category::get();

            return view('category.add', ['categories' => $categories, 'fields' => $fields]);
        }
    }

    public function category_list()
    {
        $category_list = Category::with('icon')->paginate(30);

        return view('category.list', ['category_list' => $category_list]);
    }

    public function update_category(Request $request, $id)
    {
        if ($request->isMethod('post')) {
            $rules = [
                'name' => 'required|regex:/^[\s\w-]*$/',
                'description' => 'required',
                'product' => 'required',
            ];

            $messages = [
                'name.required' => 'Name is required',
                'description.required' => 'Description is required',
                'product.required' => 'Product is required',
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }

            if ($request->image !== null) {
                $image_name = Str::uuid() . '.' . $request->file('image')->getClientOriginalName();
                // $path = Storage::disk('s3')->put('images', $request->image);
                // $image_path = Storage::disk('s3')->url($path);
                $image_mime = $request->file('image')->getClientMimeType();
                $image_ext = $request->file('image')->extension();

                $category = Category::where('id', $id)->first();
                $get_icon_id = $category->iconId;

                $file_data = [
                    'key_name' => $image_name,
                    'extension' => $image_ext,
                    'name' => $image_name,
                    'mime' => $image_mime,
                    'relative_path' => '',
                    // 'absolute_path'=> $image_path,
                    'absolute_path' => 'https://lomba-task-temp.s3.ap-south-1.amazonaws.com/images/MONRfS7gQ3w0LOJOlijQ8j1Ned7TC7NhSeeCGpfj.png',
                    'location' => 's3',
                    'updatedAt' => Carbon::now(),
                ];

                $send_file_data = Files::where('id', $get_icon_id)->update($file_data);
            }

            if ($request->parent == 0) {
                $parentId = null;
            } else {
                $parentId = $request->product;
            }

            $data = [
                'name' => $request->name,
                'description' => $request->description,
                'isPopular' => isset($request->popular) ? 1 : 0,
                'isActive' => isset($request->active) ? 1 : 0,
                'parentId' => $parentId,
                'createdAt' => Carbon::now(),
                'updatedAt' => Carbon::now(),
            ];

            Category::where('id', $id)->update($data);

            if ($data) {
                if ($request->fields !== null) {

                    $deleteOldRecords = CategoryField::where('categoryId', $id)->delete();

                    $category_fields = array();

                    foreach ($request->input('fields') as $field) {
                        $category_field = array();
                        $category_field['categoryId'] = $id;
                        $category_field['fieldId'] = $field;
                        array_push($category_fields, $category_field);
                    }

                    $send_category_fields = CategoryField::insert($category_fields);
                }

                return redirect()->route('category_list')->with('response', ['status' => 'success', 'message' => 'Category updated successfully']);
            } else {
                return redirect()->route('category_list')->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);

            }

        } else {
            $data = Category::with('icon')->find($id);

            if (!$data) {
                abort(404);
            }

            $categories = Category::orderBy('name')->get();
            $get_parentId = $data->parentId;

            $parent_category_name = Category::where('id', $get_parentId)->first();

            $fields = Fields::get();
            $parent_category = Category::where('id', $id)->get();
            $category = Category::with('fields')->find($id);
            $existingFields = $category->fields;

            return view('category.update', ['data' => $data, 'categories' => $categories, 'fields' => $fields, 'parent_category_name' => $parent_category_name, 'existingFields' => $existingFields]);
        }
    }
}
