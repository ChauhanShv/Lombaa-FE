<?php

namespace App\Http\Controllers;

use App\Models\Countries;
use Grimzy\LaravelMysqlSpatial\Types\Point;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Str;

class LocationController extends Controller
{

    public function country_list()
    {
        $countries = Countries::get();
        return view('location.country.list', ['countries' => $countries]);
    }

    public function add_country(Request $request)
    {
        if ($request->isMethod('post')) {
            $rules = [
                'name' => 'required|regex:/^[\s\w-]*$/',
                'code' => 'required',
                'lat' => 'required|numeric|between:-90,90',
                'long' => 'required|numeric|between:-180,180',
            ];
            $messages = [
                'name.required' => 'Country name is required',
                'code.required' => 'Country code is required',
                'lat.required' => 'Latitude is required',
                'lat.numeric' => 'Incorrect Latitude inserted',
                'long.required' => 'Longitude is required',
                'long.numeric' => 'Incorrect Latitude inserted',
            ];
            $validator = Validator::make($request->all(), $rules, $messages);
            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }
            $country_name = $request->input('name');
            $country_code = $request->input('code');

            $country = new Countries();

            $country->id = Str::uuid();
            $country->name = $country_name;
            $country->code = $country_code;
            $country->phoneCode = $request->input('phoneCode');
            $country->coordinate = new Point($request->lat, $request->long);

            $country->save();

            try {
                return redirect()->route('country_list')->with('response', ['status' => 'success', 'message' => 'Country added successfully']);
            } catch (Exception $e) {
                return redirect()->route('country_list')->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);
            }
        } else {
            return view('location.country.add');
        }
    }

    public function update_country(Request $request, $id)
    {
        if ($request->isMethod('post')) {
            $rules = [
                'name' => 'required|regex:/^[\s\w-]*$/',
                'code' => 'required',
            ];
            $messages = [
                'name.required' => 'Country name is required',
                'code.required' => 'Country code is required',
            ];

            $validator = Validator::make($request->all(), $rules, $messages);
            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }
            $country_name = $request->input('name');
            $country_code = $request->input('code');

            $country = Countries::find($id);

            $country->name = $country_name;
            $country->code = $country_code;
            $country->phoneCode = $request->input('phoneCode');
            $country->coordinate = new Point($request->lat, $request->long);

            $country->save();

            try {
                return redirect()->route('country_list')->with('response', ['status' => 'success', 'message' => 'Country updated successfully']);
            } catch (Exception $e) {
                return redirect()->route('country_list')->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);
            }
        } else {
            $country = Countries::where('id', $id)->first();
            return view('location.country.update', ['id' => $id, 'country' => $country]);
        }
    }
}
