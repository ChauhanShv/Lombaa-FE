<?php

namespace App\Http\Controllers;

use App\Models\Settings;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function settings()
    {

        $setting = Settings::get();

        // dd($settings_data);
        return view('settings.list', ['setting' => $setting]);
    }

    public function settings_post(Request $request)
    {

        // dd($request->$setting->key_name);

        $settings = Settings::get();

        foreach ($settings as $setting) {

            $name = $setting->key_name;

            $data = [
                'value' => $request->$name,
            ];

            Settings::where('id', $setting->id)->update($data);
        }
        return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Setting updated successfully']);
    }
}
