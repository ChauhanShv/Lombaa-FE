<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Str;
use App\Models\StaticPage;
use App\Models\PageCategory;
use Carbon\Carbon;

class StaticPagesController extends Controller
{
    public function add_pages(Request $request) {
        if($request->isMethod('post')){

            $rules = [
                'selectPageCategory' => 'required',
                'title' => 'required',
                'description' => 'required',
                'slug' => 'required',
                'contents' => 'required',
            ];
            $messages = [
                'selectPageCategory' => 'Page Category is required',
                'title.required' => 'Title is required',
                'description.required' => 'Description is required',
                'slug.required' => 'Slug is required',
                'contents.required' => 'Content is required',
            ];

            $validator = Validator::make($request->all(), $rules, $messages);
            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }

            $page = new StaticPage;
            $page->id = Str::uuid();
            $page->pageCategoryId = $request->selectPageCategory;
            $page->title = $request->title;
            $page->description = $request->description;
            $page->slug = $request->slug;
            $page->content = $request->contents;
            $page->enabledAt = Carbon::now();

            if($page->save()) {
                return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Static page added successfully']);
            }
            else {
                return redirect()->back()->with('response', ['status' => 'error', 'message' => 'Something went wrong']);
            }
        }
        else {
            $page_categories = PageCategory::get();
            return view ('staticPages.add', ['page_categories' => $page_categories]);
        }
    }
    public function list(Request $request) {
        $pages = StaticPage::get();
        return view('staticPages.list', ['pages' => $pages]);
    }

    public function delete(Request $request, $id) {
        StaticPage::find($id)->delete();
        return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Page deleted successfully']);
    }
}
