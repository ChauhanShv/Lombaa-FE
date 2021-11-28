<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Regions;
use App\Models\Countries;

class RegionController extends Controller
{
    public function add_region(Request $request){
        if($request->isMethod('post')){
            $rules = [
                'name' => 'required|regex:/^[\s\w-]*$/',
                'region_code' => 'required',
            ];
            $messages = [
                    'name.required' => 'Region name is required',
                    'region_code.required' => 'Region code is required',
            ];
            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }
            $country = $request->country;
            $region_name = $request->input('name');
            $region_code = $request->input('region_code');

            $data = [
                'id' => Str::uuid(),
                'countryId' => $coutry,
                'name' => $region_name,
                'code' => $region_code,
                'createdAt' => Carbon::now(),
                'updatedAt' => Carbon::now()
            ];
            $insert_country = Regions::insert($data);
            try {
                return redirect()->route('region')->with('response', ['status' => 'success', 'message' => 'Country added successfully']);
            }catch (Exception $e){
                return redirect()->route('region')->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);

            }

        }else{
            return view ('location.region.add');
        }
    }

    public function region_list() {
        $countries = Countries::get();
        // dd($countries);
        $regions = Regions::get();
        // dd($region);
        return view ('location.region.list', ['countries' => $countries, 'regions' => $regions]);
    }
}
