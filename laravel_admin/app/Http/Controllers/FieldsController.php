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
    public function field_list()
    {
        $fields_list = Fields::with('icon')->paginate(30);
        $field_values = Values::get();

        return view('fields.list', ['fields_list' => $fields_list, 'field_values' => $field_values]);
    }

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

            $send_file_data = Files::create($file_data);

            $count = Fields::count();

            if ($send_file_data) {
                $data = [
                    'id' => Str::uuid(),
                    'label' => $request->label,
                    'isRequired' => isset($request->required) ? 1 : 0,
                    'isActive' => isset($request->active) ? 1 : 0,
                    'dataTypes' => $request->dataTypes,
                    'fieldType' => $request->fieldtype,
                    'sortOrder' => $count + 1,
                    'iconId' => $file_data['id'],
                ];

                $submit_data = Fields::create($data);

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

            $data_types = array(
                'String' => 'string',
                'Boolean' => 'boolean',
                'Numeric' => 'numeric',
            );

            $values = Values::where('fieldId', '=', null)->get();

            return view('fields.add', ['fieldtypes' => $field_types, 'data_types' => $data_types, 'values' => $values]);
        }
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

        $data_types = array(
            'String' => 'string',
            'Boolean' => 'boolean',
            'Numeric' => 'numeric',
        );

        $fields = Fields::with(['values', 'values.icon', 'icon'])->find($id);

        $values = Values::where('fieldId', '=', null)->get();

        return view('fields.update', ['id' => $id, 'field_types' => $field_types, 'data_types' => $data_types, 'fields' => $fields, 'values' => $values]);
    }

    public function field_edit_post($id)
    {
        $rules = [
            'label' => 'required|regex:/^[\s\w-]*$/',
            'fieldtype' => 'required',
            'icon' => 'required',
            'dataTypes' => 'required',
        ];

        $messages = [
            'label.required' => 'Label is required',
            'fieldtype.required' => 'Field Type is required',
            'icon.required' => 'Icon is required',
            'dataTypes.required' => 'Data type is required',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return redirect()->back()->withInput($request->all())->withErrors($validator);
        }

        if ($request->hasFile('icon')) {
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

            $send_file_data = Files::create($file_data);
            $icon_id = $file_data['id'];
        } else {
            $get_icon_id = Fields::where('id', $id)->first();
            $icon_id = $get_icon_id->iconId;
        }

        if ($send_file_data) {
            $data = [
                'label' => $request->label,
                'isRequired' => isset($request->required) ? 1 : 0,
                'isActive' => isset($request->active) ? 1 : 0,
                'dataTypes' => $request->dataTypes,
                'fieldType' => $request->fieldtype,
                'iconId' => $icon_id,
            ];

            $submit_data = Fields::where('id', $id)->update($data);

            if ($submit_data) {
                foreach ($request->values as $value) {
                    $field_id = ['fieldId' => $data['id']];
                    Values::where('id', $value)->update($field_id);
                }

                return redirect()->route('field_list')->with('response', ['status' => 'success', 'message' => 'Field updated successfully']);

            } else {
                return redirect()->route('fields')->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);
            }
        } else {
            return redirect()->route('fields')->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);
        }
    }

    public function delete_value($id)
    {
        $delete_value = Values::where('id', $id)->delete();

        if ($delete_value) {
            return redirect()->back()->with('response', ['status' => 'Success', 'message' => 'Value deleted successfully']);
        } else {
            return redirect()->back()->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);
        }
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
