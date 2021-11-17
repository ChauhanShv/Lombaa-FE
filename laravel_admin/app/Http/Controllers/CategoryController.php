<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Files;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
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
            
            // $imageName = time().$request->image;
            $imageName = Str::uuid().'.'.$request->file('image')->getClientOriginalName();
            $path = Storage::disk('s3')->put('images', $request->image);
            $imagePath = Storage::disk('s3')->url($path);
            $imageMime = $request->file('image')->getClientMimeType();
            $imageExt = $request->file('image')->extension();

            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }

            $fileData = [
                
                'id' => Str::uuid(),
                'key_name' => $imageName,
                'extension' => $imageExt,
                'name' => $imageName,
                'mime' => $imageMime,
                'relative_path' => '',
                'absolute_path'=> $imagePath,
                'location' => 's3',
                'createdAt'=> Carbon::now(),
                'updatedAt' => Carbon::now()

            ];

            $sendFileData = Files::insert($fileData);
            
            // $data = [
            //     'id' => Str::uuid(),
            //     'name' => $request->name,
            //     'description' => $request->description,
            //     'iconId' => $imageName,
            //     'isPopular' => isset($request->popular) ? 1 : 0,
            //     'isActive' => isset($request->active) ? 1 : 0,
            //     'parentId' => $request->product,
            //     'createdAt' => Carbon::now(),
            //     'updatedAt' => Carbon::now()
            // ];

            // $sendData = Category::insert($data);
                return redirect()->route('categories')->with('response', ['status' => 'success', 'message' => 'Categories added successfully']);

            }else{
                $categories = Category::get();
                return view('category.add', ['categories'=> $categories]);
            }
    }
}
