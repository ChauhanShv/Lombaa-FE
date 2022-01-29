<?php

namespace App\Http\Controllers;

use App\Models\Fields;
use App\Models\Files;
use App\Models\Values;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Storage;
use Str;

class ValuesController extends Controller
{
    public function values()
    {
        $values = Values::with('icon')->with('field')->paginate();
        return view('value.list', ['values' => $values]);
    }

    public function delete_value($id)
    {
        Values::find($id)->delete();
        return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Value deleted successfully']);
    }

    public function values_add(Request $request)
    {
        if ($request->isMethod('post')) {

            $rules = [
                'name' => 'required',
            ];

            $messages = [
                'name.required' => 'Value name is required',
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }

            if ($request->hasFile('icon')) {
                $iconName = Str::uuid() . '.' . $request->file('icon')->getClientOriginalName();
                $path = Storage::disk('s3')->put('images', $request->icon);
                $iconPath = Storage::disk('s3')->url($path);
                $iconMime = $request->file('icon')->getClientMimeType();
                $iconExt = $request->file('icon')->extension();

                $fileData = [
                    'id' => Str::uuid(),
                    'key_name' => $iconName,
                    'extension' => $iconExt,
                    'name' => $iconName,
                    'mime' => $iconMime,
                    'relative_path' => '',
                    'absolute_path' => $iconPath,
                    'location' => 's3',
                ];

                $sendFileData = Files::create($fileData);
            }

            $data = [
                'id' => Str::uuid(),
                'value' => $request->name,
                'iconId' => $request->icon ? $fileData['id'] : null,
                'fieldId' => $request->field,
            ];

            $sendData = Values::create($data);
            $field_name = Fields::where('id', $data['fieldId'])->first('label');
            $value_name = $data['value'];

            if ($field_name) {
                return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Value added successfully', 'field_name' => $field_name['label'], 'value_name' => $value_name]);
            } else {
                return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Value added successfully', 'field_name' => 'none', 'value_name' => $value_name]);
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
                $path = Storage::disk('s3')->put('images', $request->icon);
                $iconPath = Storage::disk('s3')->url($path);
                $iconMime = $request->file('icon')->getClientMimeType();
                $iconExt = $request->file('icon')->extension();

                $fileData = [
                    'id' => Str::uuid(),
                    'key_name' => $iconName,
                    'extension' => $iconExt,
                    'name' => $iconName,
                    'mime' => $iconMime,
                    'relative_path' => '',
                    'absolute_path' => $iconPath,
                    'location' => 's3',
                ];

                Files::create($fileData);

                $iconId = $fileData['id'];

            } else {

                $getIconId = Values::where('id', $id)->first();
                $iconId = $getIconId->iconId;
            }

            $data = [
                'value' => $request->name,
                'iconId' => $iconId,
                'fieldId' => $request->field,
            ];

            $sendData = Values::where('id', $id)->update($data);

            return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Value updated successfully']);

        } else {
            $fields = Fields::get();
            $value = Values::with('field')->where('id', $id)->first();
            return view('value.update', ['fields' => $fields, 'value' => $value]);
        }
    }
}
