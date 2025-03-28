<?php

namespace App\Http\Controllers;

use App\Models\Cities;
use App\Models\Countries;
use App\Models\Regions;
use Grimzy\LaravelMysqlSpatial\Types\Point;
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

    public function delete_city($id)
    {
        Cities::find($id)->delete();
        return redirect()->back()->with('response', ['status' => 'success', 'message' => 'City deleted successfully']);
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
                'lat.required' => 'Latitude is required',
                'lat.numeric' => 'Incorrect Latitude inserted',
                'long.required' => 'Longitude is required',
                'long.numeric' => 'Incorrect Latitude inserted',
            ];
            $validator = Validator::make($request->all(), $rules, $messages);
            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }
            $city_name = $request->input('name');
            $city_code = $request->input('code');
            $region = $request->input('region');

            $city = new Cities;

            $city->id = Str::uuid();
            $city->name = $city_name;
            $city->code = $city_code;
            $city->regionId = $region;
            $city->coordinate = new Point($request->lat, $request->long);

            $city->save();

            try {
                return redirect()->route('city_list')->with('response', ['status' => 'success', 'message' => 'City added successfully']);
            } catch (Exception $e) {
                return redirect()->route('city_list')->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);
            }
        } else {
            $regions = Regions::get();
            $countries = Countries::get();
            $country_id = null;
            return view('location.city.add', ['regions' => $regions, 'countries' => $countries, 'country_id' => $country_id]);
        }
    }

    public function with_country($country_id)
    {
        $regions = Regions::where('countryId', $country_id)->get();
        $countries = Countries::get();
        return view('location.city.add', ['regions' => $regions, 'countries' => $countries, 'country_id' => $country_id]);
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
                'coordinate' => new Point($request->lat, $request->long),
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
