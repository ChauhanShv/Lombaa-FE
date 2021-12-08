<?php

namespace App\Http\Controllers;

use App\Models\Fields;
use App\Models\Files;
use App\Models\Values;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Str;

class ValuesController extends Controller
{
    public function values()
    {

        $values = Values::with('icon')->with('field')->paginate();
        return view('value.list', ['values' => $values]);
    }

    public function values_add(Request $request)
    {
        if ($request->isMethod('post')) {

            $rules = [
                'name' => 'required',
                'icon' => 'required',
            ];

            $messages = [
                'name.required' => 'Value name is required',
                'icon' => 'Icon is required',
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }

            $iconName = Str::uuid() . '.' . $request->file('icon')->getClientOriginalName();
            // $path = Storage::disk('s3')->put('images', $request->icon);
            // $iconPath = Storage::disk('s3')->url($path);
            $iconMime = $request->file('icon')->getClientMimeType();
            $iconExt = $request->file('icon')->extension();

            $fileData = [
                'id' => Str::uuid(),
                'key_name' => $iconName,
                'extension' => $iconExt,
                'name' => $iconName,
                'mime' => $iconMime,
                'relative_path' => '',
                // 'absolute_path'=> $iconPath,
                'absolute_path' => 'https://lomba-task-temp.s3.ap-south-1.amazonaws.com/images/L27xI2KWxQerlkrlwWnPvHl0BJDLnfRzpRaQjrQb.jpg',
                'location' => 's3',
            ];

            $sendFileData = Files::insert($fileData);

            if ($sendFileData) {
                $data = [
                    'id' => Str::uuid(),
                    'value' => $request->name,
                    'iconId' => $fileData['id'],
                ];

                $sendData = Values::insert($data);

                return redirect()->route('values')->with('response', ['status' => 'success', 'message' => 'Value added successfully']);

            } else {
                return redirect()->route('values')->with('response', ['status' => 'success', 'message' => 'Something went wrong']);
            }

        } else {

            $fields = Fields::get();

            return view('value.add', ['fields' => $fields]);
        }
    }

    public function values_update(Request $request, $id)
    {

        if ($request->ismethod('post')) {

            if ($request->hasFile('icon')) {

                $getIconId = Values::where('id', $id)->first();
                $deleteOldIcon = Files::where('id', $getIconId->iconId)->delete();

                $iconName = Str::uuid() . '.' . $request->file('icon')->getClientOriginalName();
                // $path = Storage::disk('s3')->put('images', $request->icon);
                // $iconPath = Storage::disk('s3')->url($path);
                $iconMime = $request->file('icon')->getClientMimeType();
                $iconExt = $request->file('icon')->extension();

                $fileData = [
                    'id' => Str::uuid(),
                    'key_name' => $iconName,
                    'extension' => $iconExt,
                    'name' => $iconName,
                    'mime' => $iconMime,
                    'relative_path' => '',
                    // 'absolute_path'=> $iconPath,
                    'absolute_path' => 'https://lomba-task-temp.s3.ap-south-1.amazonaws.com/images/L27xI2KWxQerlkrlwWnPvHl0BJDLnfRzpRaQjrQb.jpg',
                    'location' => 's3',
                ];

                Files::insert($fileData);

                $iconId = $fileData['id'];

            } else {

                $getIconId = Values::where('id', $id)->first();
                $iconId = $getIconId->iconId;
            }

            $data = [
                'value' => $request->name,
                'iconId' => $iconId,
            ];

            $sendData = Values::where('id', $id)->update($data);

            return redirect()->route('values')->with('response', ['status' => 'success', 'message' => 'Value updated successfully']);

        } else {

            $fields = Fields::get();
            $value = Values::with('field')->where('id', $id)->first();
            return view('value.update', ['fields' => $fields, 'value' => $value]);
        }
    }
}
