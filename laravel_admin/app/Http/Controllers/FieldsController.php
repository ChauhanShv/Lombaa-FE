<?php

namespace App\Http\Controllers;

use App\Models\Fields;
use App\Models\Files;
use App\Models\Values;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Str;

class FieldsController extends Controller
{
    public function fields(Request $request)
    {
        if ($request->isMethod('post')) {
            $rules = [
                'label' => 'required|regex:/^[\s\w-]*$/',
                'fieldtype' => 'required',
                'icon' => 'required',
            ];

            $messages = [
                'label.required' => 'Label is required',
                'fieldtype.required' => 'Field Type is required',
                'icon.required' => 'Icon is required',
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }

            $icon_name = Str::uuid() . '.' . $request->file('icon')->getClientOriginalName();
            // $path = Storage::disk('s3')->put('images', $request->icon);
            // $iconPath = Storage::disk('s3')->url($path);
            $icon_mime = $request->file('icon')->getClientMimeType();
            $icon_ext = $request->file('icon')->extension();

            $file_data = [
                'id' => Str::uuid(),
                'key_name' => $icon_name,
                'extension' => $icon_ext,
                'name' => $icon_name,
                'mime' => $icon_mime,
                'relative_path' => '',
                // 'absolute_path'=> $iconPath,
                'absolute_path' => 'https://lomba-task-temp.s3.ap-south-1.amazonaws.com/images/L27xI2KWxQerlkrlwWnPvHl0BJDLnfRzpRaQjrQb.jpg',
                'location' => 's3',
            ];

            $send_file_data = Files::insert($file_data);

            if ($send_file_data) {
                $data = [
                    'id' => Str::uuid(),
                    'label' => $request->label,
                    'isRequired' => isset($request->required) ? 1 : 0,
                    'isActive' => isset($request->active) ? 1 : 0,
                    'dataTypes' => $request->datatype,
                    'fieldType' => $request->fieldtype,
                    'sortOrder' => null,
                    'iconId' => $fileData['id'],
                ];

                $submit_data = Fields::insert($data);

                if ($submit_data) {
                    foreach ($request->values as $value) {
                        $field_id = ['fieldId' => $data['id']];
                        Values::where('id', $value)->update($field_id);
                    }

                    return redirect()->route('field_list')->with('response', ['status' => 'success', 'message' => 'Field added successfully']);

                } else {
                    return redirect()->route('fields')->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);
                }
            } else {
                return redirect()->route('fields')->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);
            }
        } else {
            $field_types = array(
                'Label' => 'Label',
                'Dropdown' => 'Dropdown',
                'Checkbox' => 'Checkbox',
                'Switch' => 'Switch',
                'Tag View' => 'Tag View',
            );

            $values = Values::where('fieldId', '=', null)->get();

            return view('fields.add', ['fieldtypes' => $field_types, 'values' => $values]);
        }
    }

    public function field_list()
    {
        $fields_list = Fields::with('icon')->paginate(30);
        $field_values = Values::get();

        return view('fields.list', ['fields_list' => $fields_list, 'field_values' => $field_values]);
    }

    public function field_edit($id)
    {
        $field_types = array(
            'Label' => 'Label',
            'Dropdown' => 'Dropdown',
            'Checkbox' => 'Checkbox',
            'Switch' => 'Switch',
            'Tag View' => ' Tag View',
        );

        $fields = Fields::with(['values', 'values.icon', 'icon'])->find($id);

        return view('fields.update', ['id' => $id, 'fieldtypes' => $field_types, 'fields' => $fields]);
    }

    public function field_edit_post()
    {
    }

    public function update_icon($label, $value, $id)
    {
        $icon = Files::where('id', $id)->first();

        return view('fields.updateicon', ['icon' => $icon, 'label' => $label, 'value' => $value]);
    }

    public function update_icon_post(Request $request, $label, $value, $id)
    {
        $rules = [
            'icon' => 'required',
        ];

        $messages = [
            'icon.required' => 'Icon is required',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        $icon_name = Str::uuid() . '.' . $request->file('icon')->getClientOriginalName();
        // $path = Storage::disk('s3')->put('images', $request->icon);
        // $iconPath = Storage::disk('s3')->url($path);
        $icon_mime = $request->file('icon')->getClientMimeType();
        $icon_ext = $request->file('icon')->extension();

        if ($validator->fails()) {
            return redirect()->back()->withInput($request->all())->withErrors($validator);
        }

        $file_data = [
            'key_name' => $icon_name,
            'extension' => $icon_ext,
            'name' => $icon_name,
            'mime' => $icon_mime,
            'relative_path' => '',
            // 'absolute_path'=> $iconPath,
            'absolute_path' => 'https://lomba-task-temp.s3.ap-south-1.amazonaws.com/images/L27xI2KWxQerlkrlwWnPvHl0BJDLnfRzpRaQjrQb.jpg',
            'location' => 's3',
        ];

        $send_file_data = Files::where('id', $id)->update($file_data);

        return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Icon updated successfully']);
    }
}
