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

    public function update_page(Request $request, $id) {
        if($request->isMethod('post')) {
                $rules = [
                    'pageCategory' => 'required',
                    'title' => 'required',
                    'description' => 'required',
                    'slug' => 'required',
                    'contents' => 'required',
                ];
                $messages = [
                    'pageCategory.required' => 'Page Category is required',
                    'title.required' => 'Title is required',
                    'description.required' => 'Description is required',
                    'slug.required' => 'Slug is required',
                    'contents.required' => 'Content is required',
                ];
    
                $validator = Validator::make($request->all(), $rules, $messages);
                if ($validator->fails()) {
                    return redirect()->back()->withInput($request->all())->withErrors($validator);
                }
                $page_category = $request->input('pageCategory');
                $title = $request->input('title');
                $description = $request->input('description');
                $slug = $request->input('slug');
                $content = $request->input('contents');

                $data = [
                    'pageCategoryId' => $page_category,
                    'title' => $title,
                    'description' => $description,
                    'slug' => $slug,
                    'content' => $content
                ];  
                $update_page = StaticPage::where('id', $id)->update($data);
                try {
                    return redirect()->route('page_list')->with('response', ['status' => 'success', 'message' => 'Page updated successfully']);
                } catch (Exception $e) {
                    return redirect()->back()->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);
                }
            
            }else {
                $page_categories = PageCategory::get();
                $static_page = StaticPage::with('pageCategory')->where('id', $id)->first();
                $page_category_name = PageCategory::where('id', $static_page->pageCategoryId)->first();
                return view('staticPages.update', ['page_category_name' => $page_category_name, 'page_categories' => $page_categories, 'static_page' => $static_page]);
        }
    }
}
