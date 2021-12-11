<?php

namespace App\Http\Controllers;

use App\Models\Cities;
use App\Models\Regions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Str;

class CityController extends Controller
{
    public function city_list()
    {
        $cities = Cities::with('region')->get();
        return view('location.city.list', ['cities' => $cities]);
    }

    public function add_city(Request $request)
    {
        if ($request->isMethod('post')) {
            $rules = [
                'name' => 'required|regex:/^[\s\w-]*$/',
                'code' => 'required',
                'region' => 'required',
                'lat' => 'required|numeric|between:-90,90',
                'long' => 'required|numeric|between:-180,180',
            ];
            $messages = [
                'name.required' => 'City name is required',
                'code.required' => 'City code is required',
                'region.required' => 'Region name is required',
                'lat' => 'required|numeric|between:-90,90',
                'long' => 'required|numeric|between:-180,180',
            ];
            $validator = Validator::make($request->all(), $rules, $messages);
            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }
            $city_name = $request->input('name');
            $city_code = $request->input('code');
            $region = $request->input('region');
            $data = [
                'id' => Str::uuid(),
                'name' => $city_name,
                'code' => $city_code,
                'regionId' => $region,
                'coordinate' => \DB::raw("GeomFromText('POINT({$request->lat} {$request->long})')"),
            ];
            $insert_city = Cities::create($data);
            try {
                return redirect()->route('city_list')->with('response', ['status' => 'success', 'message' => 'City added successfully']);
            } catch (Exception $e) {
                return redirect()->route('city_list')->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);
            }
        } else {
            $regions = Regions::get();
            return view('location.city.add', ['regions' => $regions]);
        }
    }

    public function update_city(Request $request, $id)
    {
        if ($request->isMethod('post')) {
            $rules = [
                'name' => 'required|regex:/^[\s\w-]*$/',
                'code' => 'required',
                'region' => 'required',
            ];
            $messages = [
                'name.required' => 'City name is required',
                'code.required' => 'City code is required',
                'region.required' => 'Region name is required',
            ];
            $validator = Validator::make($request->all(), $rules, $messages);
            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }
            $city_name = $request->input('name');
            $city_code = $request->input('code');
            $region = $request->input('region');
            $data = [
                'name' => $city_name,
                'code' => $city_code,
                'regionId' => $region,
                'coordinate' => \DB::raw("GeomFromText('POINT({$request->lat} {$request->long})')"),
            ];
            $insert_city = Cities::where('id', $id)->update($data);
            try {
                return redirect()->route('city_list')->with('response', ['status' => 'success', 'message' => 'City updated successfully']);
            } catch (Exception $e) {
                return redirect()->route('city_list')->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);

            }
        } else {
            $regions = Regions::get();
            $city = Cities::with('region')->where('id', $id)->first();
            return view('location.city.update', ['id' => $id, 'city' => $city, 'regions' => $regions]);
        }
    }
}
