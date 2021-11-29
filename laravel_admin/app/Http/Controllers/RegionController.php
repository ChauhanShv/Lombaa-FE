<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Regions;
use App\Models\Countries;
use Carbon\Carbon;
use Str;

class RegionController extends Controller
{
    public function region_list() {
        $regions = Regions::with('country')->get();
        return view ('location.region.list', ['regions' => $regions]);
    }

    public function add_region(Request $request) {
        if($request->isMethod('post')) {

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
                'id' => Str::uuid(),
                'name' => $region_name,
                'code' => $region_code,
                'countryId' => $country,
                'createdAt' => Carbon::now(),
                'updatedAt' => Carbon::now()
            ];
            $insert_region = Regions::insert($data);
            try {
                return redirect()->route('region_list')->with('response', ['status' => 'success', 'message' => 'Region added successfully']);
            }catch (Exception $e){
                return redirect()->route('region_list')->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);
            }
        }else {
            $countries = Countries::get();
            return view ('location.region.add', ['countries' => $countries]);
        }
    }

    public function update_region(Request $request, $id) {
        if($request->isMethod('post')){

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
                'updatedAt' => Carbon::now()
            ];
            $insert_country = Regions::where('id', $id)->update($data);
            try {
                return redirect()->route('country_list')->with('response', ['status' => 'success', 'message' => 'Region updated successfully']);
            }catch (Exception $e){
                return redirect()->route('country_list')->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);

            }

        }else {
            $countries = Countries::get();
            $region = Regions::with('country')->where('id', $id)->first();
            return view ('location.region.update', ['id' => $id, 'region' => $region, 'countries' => $countries]);
        }

    }
}
