<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Files;
use App\Models\Fields;
use App\Models\CategoryField;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Aws\S3\S3Client;
use Str;

class CategoryController extends Controller
{
    public function categories(Request $request){
        if($request->isMethod('post')){
            $rules = [
                'name' => 'required|regex:/^[\s\w-]*$/',
                'description' => 'required',
                'image' => 'required',
                'product' => 'required',
            ];
            $messages = [
                    'name.required' => 'Name is required',
                    'description.required' => 'Description is required',
                    'image.required' => 'Image is required',
                    'product.required'=> 'Product is required',
            ];
            $validator = Validator::make($request->all(), $rules, $messages);
            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }
            $image_name = Str::uuid().'.'.$request->file('image')->getClientOriginalName();
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
                // 'absolute_path'=> $image_path,
                'absolute_path' => 'https://lomba-task-temp.s3.ap-south-1.amazonaws.com/images/Djehr3diIDdqjo8Wf2JhFbZC70M9w1RZ0xb9VFH4.png',
                'location' => 's3',
                'createdAt'=> Carbon::now(),
                'updatedAt' => Carbon::now()
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
                'parentId' => $request->product ? $request->product  : null,
                'createdAt' => Carbon::now(),
                'updatedAt' => Carbon::now()
            ];

            Category::insertGetId($data);

            if($data) {

                $category_fields = array();

                foreach($request->input('fields') as $field) {
                    $category_field = array();

                    $category_field['categoryId'] = $category_id;
                    $category_field['fieldId'] = $field;
                    array_push($category_fields, $category_field);
                }

                $send_category_fields = CategoryField::insert($category_fields);
                return redirect()->route('categories')->with('response', ['status' => 'success', 'message' => 'Categories added successfully']);
            }
            else{
                return redirect()->route('categories')->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);

            }

        }else{
            
            $fields = Fields::get();
            $categories = Category::get();
            return view('category.add', ['categories'=> $categories, 'fields'=> $fields]);
        }
    }

    public function category_list() {
        $category_list = Category::with('icon')->paginate(30);
        return view('category.categorylist',  ['category_list' => $category_list]);
    }


    public function update_category($id) {
    
        $data = Category::with('icon')->find($id);

        $categories = Category::get();
        $fields = Fields::get();

        return view('category.categoryupdate', ['data' => $data, 'categories' => $categories, 'fields'=> $fields]);

    }

    
    public function update_category_post (Request $request, $id) {

        $rules = [
            'name' => 'required|regex:/^[\s\w-]*$/',
            'description' => 'required',
            'image' => 'required',
            'product' => 'required',
        ];
        $messages = [
                'name.required' => 'Name is required',
                'description.required' => 'Description is required',
                'image.required' => 'Image is required',
                'product.required'=> 'Product is required',
        ];
        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return redirect()->back()->withInput($request->all())->withErrors($validator);
        }
        $image_name = Str::uuid().'.'.$request->file('image')->getClientOriginalName();
        $path = Storage::disk('s3')->put('images', $request->image);
        $image_path = Storage::disk('s3')->url($path);
        $image_mime = $request->file('image')->getClientMimeType();
        $image_ext = $request->file('image')->extension();

        $category = Category::where('id', $id)->get();
        $get_icon_id = $category->iconId;

        $file_data = [
            'key_name' => $image_name,
            'extension' => $image_ext,
            'name' => $image_name,
            'mime' => $image_mime,
            'relative_path' => '',
            'absolute_path'=> $image_path,
            // 'absolute_path' => 'https://lomba-task-temp.s3.ap-south-1.amazonaws.com/images/Djehr3diIDdqjo8Wf2JhFbZC70M9w1RZ0xb9VFH4.png',
            'location' => 's3',
            'createdAt'=> Carbon::now(),
            'updatedAt' => Carbon::now()
        ];


        $send_file_data = Files::where('id', $id)->update($file_data);
            
        $category_id = Str::uuid();
        $data = [
            'name' => $request->name,
            'description' => $request->description,
            'iconId' => $file_data['id'],
            'isPopular' => isset($request->popular) ? 1 : 0,
            'isActive' => isset($request->active) ? 1 : 0,
            'parentId' => $request->product,
            'createdAt' => Carbon::now(),
            'updatedAt' => Carbon::now()
        ];

        Category::insertGetId($data);

        if($data) {

            $category_fields = array();

            foreach($request->input('fields') as $field) {
                $category_field = array();

                $category_field['categoryId'] = $category_id;
                $category_field['fieldId'] = $field;
                array_push($category_fields, $category_field);
            }

            $send_category_fields = CategoryField::insert($category_fields);
            return redirect()->route('categorylist')->with('response', ['status' => 'success', 'message' => 'Category updated successfully']);
        }
        else{
            return redirect()->route('categorylist')->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);

        }
    }

    
}