<?php

namespace App\Http\Controllers;
use App\Models\Packages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Str;

class PackageController extends Controller
{
   public function add_packages(Request $request) 
   {       
            if ($request->isMethod('post')) {
                $rules = [
                    'name' => 'required|regex:/^[\s\w-]*$/',
                    'title' => 'required',
                    'description' => 'required',
                    'package-type' => 'required',
                    'validity' => 'required',
                    'price' => 'required',
                    'currency' => 'required',

                ];
                $messages = [
                    'name.required' => 'Package name is required',
                    'title.required' => 'title is required',
                    'description.required' => 'description is required',
                    'package-type.required' => 'Latitude is required',
                    'validity.required' => 'Validity Latitude required',
                    'price.required' => 'price is required',
                    'currency.required' => 'currency required',
                ];
                $validator = Validator::make($request->all(), $rules, $messages);
                if ($validator->fails()) {
                    return redirect()->back()->withInput($request->all())->withErrors($validator);
                }
                $name = $request->input('name');
                $description = $request->input('description');
                $title = $request->input('title');
                $validity = $request->input('validity');
                $type = $request->input('package-type');
                $price = $request->input('price');
                $currency = $request->input('currency');
    
                $package = new Packages;
    
                $package->id = Str::uuid();
                $package->name = $name;
                $package->description = $description;
                $package->title = $title;
                $package->validity = $validity;
                $package->type = $type;
                $package->price = $price;
                $package->currency = $currency;
    
                $package->save();
    
                try {
                    return redirect()->back()->with('response', ['status' => 'success', 'message' => 'package added successfully']);
                } catch (Exception $e) {
                    return redirect()->back()->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);
                }
        }
        else {
            return view('packages.add');
        }
    }
    public function package_list(Request $request)
    {
        $packages = Packages::get();
        return view('packages.list', ['packages' => $packages]);
    }
    public function delete_package($id)
    {
        Packages::find($id)->delete();
        return redirect()->back()->with('response', ['status' => 'success', 'message' => 'package deleted successfully']);
    }
    public function update_package(Request $request, $id) 
    {
        if ($request->isMethod('post')) {
            $rules = [
                'name' => 'required|regex:/^[\s\w-]*$/',
                'title' => 'required',
                'description' => 'required',
                'package-type' => 'required',
                'validity' => 'required',
                'price' => 'required',
                'currency' => 'required',
            ];
            $messages = [
                'name.required' => 'Package name is required',
                'title.required' => 'title is required',
                'description.required' => 'description is required',
                'package-type.required' => 'Latitude is required',
                'validity.required' => 'Validity Latitude required',
                'price.required' => 'price is required',
                'currency.required' => 'currency required',
            ];
            $validator = Validator::make($request->all(), $rules, $messages);
            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }
            $name = $request->input('name');
            $description = $request->input('description');
            $title = $request->input('title');
            $validity = $request->input('validity');
            $type = $request->input('package-type');
            $price = $request->input('price');
            $currency = $request->input('currency');

            $data = [
                'name' => $name,
                'description' => $description,
                'title' => $title,
                'validity' => $validity,
                'type' => $type,
                'price' => $price,
                'currency' => $currency
            ];
            $udpate_package = Packages::where('id', $id)->update($data);
            try {
                return redirect()->route('package_list')->with('response', ['status' => 'success', 'message' => 'package updated successfully']);
            } catch (Exception $e) {
                return redirect()->route('package_list')->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);

            }
        } else {
            $package = Packages::where('id', $id)->first();
            return view('packages.update', ['id' => $id, 'package' => $package]);
        }
    }
}
