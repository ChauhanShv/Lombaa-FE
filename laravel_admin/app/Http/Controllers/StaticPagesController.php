<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Str;
use App\Models\StaticPages;
use Carbon\Carbon;

class StaticPagesController extends Controller
{
    public function add_pages(Request $request) {
        if($request->isMethod('post')){

            $rules = [
                'slug' => 'required',
                'contents' => 'required',
            ];
            $messages = [
                'slug.required' => 'Slug is required',
                'contents.required' => 'Content is required',
            ];

            $validator = Validator::make($request->all(), $rules, $messages);
            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }
            $pages = new StaticPages;
            $pages->id = Str::uuid();
            $pages->slug = $request->slug;
            $pages->content = $request->contents;
            $pages->enabledAt = Carbon::now();

            if($pages->save()) {
                return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Static page added successfully']);
            }
            else {
                return redirect()->back()->with('response', ['status' => 'error', 'message' => 'Something went wrong']);
            }
        }
        else {
            return view ('staticPages.add');
        }
    }
}
