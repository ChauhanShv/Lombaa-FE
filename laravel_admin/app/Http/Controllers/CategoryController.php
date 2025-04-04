<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CategoryField;
use App\Models\Fields;
use App\Models\Files;
use App\Rules\HasSingleTitle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Storage;
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
                'product' => ['required_unless:is_parent,on'],
                'fields' => ['required_unless:is_parent,on', new HasSingleTitle],
            ];

            $messages = [
                'name.required' => 'Name is required',
                'description.required' => 'Description is required',
                'product.required' => 'Category is required',
                'image.required' => 'Icon is required for category',
                'product.required_unless' => 'Parent cartegory is required',
                'fields.required_unless' => 'Atleast one "Title" field is required',
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }

            if ($request->hasFile('image')) {
                $image_name = Str::uuid() . '.' . $request->file('image')->getClientOriginalName();
                $path = Storage::disk('s3')->put('images', $request->image);
                $image_path = Storage::disk('s3')->url($path);
                $image_mime = $request->file('image')->getClientMimeType();
                $image_ext = $request->file('image')->extension();

                $file_data = [
                    'id' => Str::uuid(),
                    'key_name' => $image_name,
                    'extension' => $image_ext,
                    'name' => $image_name,
                    'mime' => $image_mime,
                    'relative_path' => '',
                    'absolute_path' => $image_path,
                    'location' => 's3',
                ];

                $send_file_data = Files::create($file_data);
            }

            $data = [
                'name' => $request->name,
                'description' => $request->description,
                'iconId' => $request->image ? $file_data['id'] : null,
                'isPopular' => isset($request->popular) ? 1 : 0,
                'isActive' => isset($request->active) ? 1 : 0,
                'parentId' => isset($request->is_parent) ? null : $request->product,
            ];

            $category_id = Category::create($data)->id;

            if (!$data['parentId'] == null) {
                if ($data) {
                    $category_fields = array();

                    $i = 2;

                    $fields = Fields::findMany($request->fields);
                    foreach ($fields as $field) {
                        $category_field = array();
                        $category_field['categoryId'] = $category_id;
                        $category_field['fieldId'] = $field->id;

                        if ($field->fieldType === 'title') {
                            $category_field['sort'] = 1;
                        } else {
                            $category_field['sort'] = $i;
                            $i++;
                        }
                        array_push($category_fields, $category_field);
                    }

                    $send_category_fields = CategoryField::insert($category_fields);

                } else {
                    return redirect()->route('category_list')->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);
                }
            }
            return redirect()->route('category_list')->with('response', ['status' => 'success', 'message' => 'Category added successfully']);
        } else {
            $fields = Fields::get();
            $categories = Category::get();

            return view('category.add', ['categories' => $categories, 'fields' => $fields]);
        }
    }

    public function category_list()
    {
        $category_list = Category::with('icon')->paginate(30);
        foreach($category_list as $category => $value) {
            if(!empty($value['parentId'])) {
                $parent = Category::where('id',$value['parentId'])->first();
                $category_list[$category]['parent_name'] = isset($parent['name'])? $parent['name'] : '';
            }
        }
        return view('category.list', ['category_list' => $category_list]);
    }

    public function update_category(Request $request, $id)
    {
        if ($request->isMethod('post')) {
            $rules = [
                'name' => 'required|regex:/^[\s\w-]*$/',
                'description' => 'required',
                'product' => ['required_unless:is_parent,on'],
                'add_fields' => ['required_unless:is_parent,on', new HasSingleTitle],
            ];

            $messages = [
                'name.required' => 'Name is required',
                'description.required' => 'Description is required',
                'product.required' => 'Category is required',
                'product.required_unless' => 'Parent cartegory is required',
                'add_fields.required_unless' => 'Fields required',
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }

            if ($request->hasFile('image')) {
                $image_name = Str::uuid() . '.' . $request->file('image')->getClientOriginalName();
                $path = Storage::disk('s3')->put('images', $request->image);
                $image_path = Storage::disk('s3')->url($path);
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
                    'absolute_path' => $image_path,
                    'location' => 's3',
                ];

                $send_file_data = Files::where('id', $get_icon_id)->update($file_data);
            }

            $data = [
                'name' => $request->name,
                'description' => $request->description,
                'isPopular' => isset($request->popular) ? 1 : 0,
                'isActive' => isset($request->active) ? 1 : 0,
                'parentId' => isset($request->is_parent) ? null : $request->product,
            ];
            $update_category = Category::where('id', $id)->update($data);

            if ($data['parentId'] !== null) {
                if ($request->add_fields !== null) {

                    CategoryField::where('categoryId', $id)->delete();

                    $category_fields = array();

                    $i = 2;

                    $fields = Fields::findMany($request->add_fields);
                    foreach ($fields as $field) {
                        $category_field = array();
                        $category_field['categoryId'] = $id;
                        $category_field['fieldId'] = $field->id;

                        if ($field->fieldType === 'title') {
                            $category_field['sort'] = 1;
                        } else {
                            $category_field['sort'] = $i;
                            $i++;
                        }
                        array_push($category_fields, $category_field);
                    }
                    $send_category_fields = CategoryField::insert($category_fields);
                }

            } else {
                CategoryField::where('categoryId', $id)->delete();
            }
            return redirect()->route('category_list')->with('response', ['status' => 'success', 'message' => 'Category updated successfully']);

        } else {
            $data = Category::with('icon')->find($id);
            $categories = Category::orderBy('name')->get();
            $fields = Fields::get();
            $existing_fields = CategoryField::with('fields')->where('categoryId', $id)->get();

            $non_existing_fields = array();

            foreach ($fields as $field) {
                $found = false;
                foreach ($existing_fields as $ext) {
                    if ($field->id === $ext->fields->id) {
                        $found = true;
                        break;
                    }
                }
                if (!$found) {
                    array_push($non_existing_fields, $field);
                }
            }

            return view('category.update', ['data' => $data, 'categories' => $categories, 'fields' => $fields, 'existing_fields' => $existing_fields, 'non_existing_fields' => $non_existing_fields]);
        }
    }

    public function delete_category($id)
    {
        $delete = Category::where('id', $id)->delete();

        return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Category deleted successfully']);
    }

    public function category_filter($action)
    {
        if ($action === 'parent_categories') {
            $category_list = Category::whereNull('parentId')->paginate(30);
            return view('category.list', ['category_list' => $category_list]);
        } elseif ($action === 'sub_categories') {
            $category_list = Category::whereNotNull('parentId')->paginate(30);
            foreach($category_list as $category => $value) {
                if(!empty($value['parentId'])) {
                    $parent = Category::where('id',$value['parentId'])->first();
                    $category_list[$category]['parent_name'] = isset($parent['name'])? $parent['name'] : '';
                }
            }
            return view('category.list', ['category_list' => $category_list]);
        }
    }
}
