<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Countries;
use Carbon\Carbon;
use Str;

class LocationController extends Controller
{
    public function add_country(Request $request){
        if($request->isMethod('post')){
            $rules = [
                'name' => 'required|regex:/^[\s\w-]*$/',
                'country_code' => 'required',
            ];
            $messages = [
                    'name.required' => 'Country name is required',
                    'country_code.required' => 'Country code is required',
            ];
            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }
            $counrtry_name = $request->input('name');
            $country_code = $request->input('country_code');
            $data = [
                'id' => Str::uuid(),
                'name' => $counrtry_name,
                'code' => $country_code,
                'createdAt' => Carbon::now(),
                'updatedAt' => Carbon::now()
            ];
            $insert_country = Countries::insert($data);
            try {
                return redirect()->route('country')->with('response', ['status' => 'success', 'message' => 'Country added successfully']);
            }catch (Exception $e){
                return redirect()->route('country')->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);

            }

        }else{
            return view ('location.country.add');
        }
    }

    public function country_list() {
        $countries = Countries::get();
        // dd($countries);
        return view ('location.country.list', ['countries' => $countries]);
    }
}