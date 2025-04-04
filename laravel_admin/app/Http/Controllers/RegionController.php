<?php

namespace App\Http\Controllers;

use App\Models\Countries;
use App\Models\Regions;
use Grimzy\LaravelMysqlSpatial\Types\Point;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Str;

class RegionController extends Controller
{
    public function region_list()
    {
        $regions = Regions::with('country')->get();
        return view('location.region.list', ['regions' => $regions]);
    }

    public function delete_region($id)
    {
        Regions::find($id)->delete();
        return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Region deleted successfully']);
    }
    public function add_region(Request $request)
    {
        if ($request->isMethod('post')) {
            $rules = [
                'name' => 'required|regex:/^[\s\w-]*$/',
                'code' => 'required',
                'country' => 'required',
                'lat' => 'required|numeric|between:-90,90',
                'long' => 'required|numeric|between:-180,180',
            ];
            $messages = [
                'name.required' => 'Region name is required',
                'code.required' => 'Region code is required',
                'country.required' => 'Country name is required',
                'lat.required' => 'Latitude is required',
                'lat.numeric' => 'Incorrect Latitude inserted',
                'long.required' => 'Longitude is required',
                'long.numeric' => 'Incorrect Latitude inserted',
            ];
            $validator = Validator::make($request->all(), $rules, $messages);
            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }

            $region_name = $request->input('name');
            $region_code = $request->input('code');
            $country = $request->input('country');

            $region = new Regions;

            $region->id = Str::uuid();
            $region->name = $region_name;
            $region->code = $region_code;
            $region->countryId = $country;
            $region->coordinate = new Point($request->lat, $request->long);

            $region->save();
            try {
                return redirect()->route('region_list')->with('response', ['status' => 'success', 'message' => 'Region added successfully']);
            } catch (Exception $e) {
                return redirect()->route('region_list')->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);
            }
        } else {
            $countries = Countries::get();
            return view('location.region.add', ['countries' => $countries]);
        }
    }

    public function update_region(Request $request, $id)
    {
        if ($request->isMethod('post')) {
            $rules = [
                'name' => 'required|regex:/^[\s\w-]*$/',
                'code' => 'required',
                'country' => 'required',
            ];
            $messages = [
                'name.required' => 'Region name is required',
                'code.required' => 'Region code is required',
                'country.required' => 'Country name is required',
            ];
            $validator = Validator::make($request->all(), $rules, $messages);
            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }
            $region_name = $request->input('name');
            $region_code = $request->input('code');
            $country = $request->input('country');
            $data = [
                'name' => $region_name,
                'code' => $region_code,
                'countryId' => $country,
                'coordinate' => new Point($request->lat, $request->long),
            ];
            $insert_country = Regions::where('id', $id)->update($data);
            try {
                return redirect()->route('region_list')->with('response', ['status' => 'success', 'message' => 'Region updated successfully']);
            } catch (Exception $e) {
                return redirect()->route('region_list')->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);
            }
        } else {
            $countries = Countries::get();
            $region = Regions::with('country')->where('id', $id)->first();
            return view('location.region.update', ['id' => $id, 'region' => $region, 'countries' => $countries]);
        }
    }
}
