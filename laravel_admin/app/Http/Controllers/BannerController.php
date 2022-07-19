<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Files;
use Storage;
use Str;
use App\Models\Banners;

class BannerController extends Controller
{
    public function add_banners(Request $request) {
        if ($request->isMethod('post')) {
            $rules = [
                'title' => 'required',
                'description' => 'required',
                'image' => 'required',
            ];
            $messages = [
                'title.required' => 'Title is required',
                'description.required' => 'Description is required',
                'image.required' => 'Media is required',
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

            $banner = new Banners;
            $banner->title = $request->title;
            $banner->description = $request->description;
            $banner->action_label = $request->actionLabel;
            $banner->action = $request->action;
            $banner->action_type = $request->actionType;
            $banner->mediaId = $request->image ? $file_data['id'] : null;


            if($banner->save()) {
                return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Banner added successfully']);
            }
            else {
                return redirect()->back()->with('response', ['status' => 'error', 'message' => 'Something went wrong']);
            }
        }
        else {
            return view('banner.add');
        }
    }

    public function list(Request $request) {
        $banner = Banners::get();
        return view ('banner.list', ['banner' => $banner]);
    }

    public function delete_banner($id)
    {
        Banners::find($id)->delete();
        return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Banner deleted successfully']);
    }

    public function update_banner (Request $request, $id) {
        if ($request->isMethod('post')) {
            $rules = [
                'title' => 'required',
                'description' => 'required',
                'image' => 'required',
            ];
            $messages = [
                'title.required' => 'Title is required',
                'description.required' => 'Description is required',
                'image.required' => 'Media is required',
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

                $banner = Banners::where('id', $id)->first();
                $get_media_id = $banner->mediaId;

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

                $send_file_data = Files::where('id', $get_media_id)->update($file_data);
            }

            $banner = [
                // 'id' => Str::uuid(),
                'title' => $request->title,
                'description' => $request->description,
                'action_label' => $request->actionLabel,
                'action' => $request->action,
                'action_type' =>  $request->actionType,
                'mediaId' => $request->image ? $file_data['id'] : null,
            ];

            $update_banner = Banners::where('id', $id)->update($banner);

            if($update_banner) {
                return redirect()->back()->with('response', ['status' => 'success', 'message' => 'banner updated successfully']);
            }
            else {
                return redirect()->back()->with('response', ['status' => 'error', 'message' => 'something went wrong']);
            }
        }
        else {
            $banner = Banners::where('id', $id)->first();
            return view('banner.update', ['id' => $id, 'banner' => $banner]);
        }
    }
}
