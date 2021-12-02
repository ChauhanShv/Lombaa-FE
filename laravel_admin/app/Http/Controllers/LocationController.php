<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Countries;
use Carbon\Carbon;
use Str;
use DB;
use Bushwalk;

class LocationController extends Controller
{
    public function add_country(Request $request){
        if($request->isMethod('post')){
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
            $counrtry_name = $request->input('name');
            $country_code = $request->input('code');

            $data = [
                'id' => Str::uuid(),
                'name' => $counrtry_name,
                'code' => $country_code,
                'coordinate' => \DB::raw("GeomFromText('POINT({$request->lat} {$request->long})')"),
                'createdAt' => Carbon::now(),
                'updatedAt' => Carbon::now()
            ];
            $insert_country = Countries::insert($data);
            try {
                return redirect()->route('country_list')->with('response', ['status' => 'success', 'message' => 'Country added successfully']);
            }catch (Exception $e){
                return redirect()->route('country_list')->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);
            }

        }else{
            return view ('location.country.add');
        }
    }

    public function country_list() {

        // $myData = \DB::table('bushwalks')->select((\DB::raw('AsText(coordinate)')))->where('id',$id)->get();

        $myData = \DB::table('countries')->select('id','name', 'code',(\DB::raw('AsText(coordinate) AS coordinate')))->get();
            // dd($myData);
        $countries = Countries::get();
        return view ('location.country.list', ['countries' => $countries, 'myData' => $myData]);
    }

    public function update_country(Request $request, $id) {
        if($request->isMethod('post')){

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

            $counrtry_name = $request->input('name');
            $country_code = $request->input('code');
            $data = [
                'name' => $counrtry_name,
                'code' => $country_code,
                'updatedAt' => Carbon::now()
            ];
            $insert_country = Countries::where('id', $id)->update($data);
            try {
                return redirect()->route('country_list')->with('response', ['status' => 'success', 'message' => 'Country updated successfully']);
            }catch (Exception $e){
                return redirect()->route('country_list')->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);

            }

        }else {
            $country = Countries::where('id', $id)->first();
            return view ('location.country.update', ['id' => $id, 'country' => $country]);
        }

    }

}