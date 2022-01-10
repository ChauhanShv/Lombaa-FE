<?php

namespace App\Http\Controllers;

use App\Models\Fields;
use App\Models\Files;
use App\Models\Values;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Storage;
use Str;

class FieldsController extends Controller
{
    public function field_list()
    {
        $fields_list = Fields::with('icon')->paginate(30);
        $field_values = Values::get();

        return view('fields.list', ['fields_list' => $fields_list, 'field_values' => $field_values]);
    }

    public function delete_field($id)
    {
        Fields::find($id)->delete();
        return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Field deleted successfully']);
    }

    public function fields(Request $request)
    {
        if ($request->isMethod('post')) {
            $rules = [
                'label' => 'required|regex:/^[\s\w-]*$/',
                'fieldtype' => 'required',
            ];

            $messages = [
                'label.required' => 'Label is required',
                'fieldtype.required' => 'Field Type is required',
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }

            if ($request->hasfile('icon')) {
                $icon_name = Str::uuid() . '.' . $request->file('icon')->getClientOriginalName();
                $path = Storage::disk('s3')->put('images', $request->icon);
                $iconPath = Storage::disk('s3')->url($path);
                $icon_mime = $request->file('icon')->getClientMimeType();
                $icon_ext = $request->file('icon')->extension();

                $file_data = [
                    'id' => Str::uuid(),
                    'key_name' => $icon_name,
                    'extension' => $icon_ext,
                    'name' => $icon_name,
                    'mime' => $icon_mime,
                    'relative_path' => '',
                    'absolute_path' => $iconPath,
                    'location' => 's3',
                ];

                $send_file_data = Files::create($file_data);
            }

            $data = [
                'id' => Str::uuid(),
                'label' => $request->label,
                'isRequired' => isset($request->required) ? 1 : 0,
                'isActive' => isset($request->active) ? 1 : 0,
                'dataTypes' => $request->dataTypes,
                'fieldType' => $request->fieldtype,
                'iconId' => $request->icon ? $file_data['id'] : null,
            ];

            $submit_data = Fields::create($data);

            if (!($request->values) == null) {
                $i = 1;
                if ($submit_data) {
                    foreach ($request->values as $value) {
                        $field_id = ['fieldId' => $data['id'], 'sort' => $i];
                        Values::where('id', $value)->update($field_id);
                        $i++;
                    }
                } else {
                    return redirect()->route('fields')->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);
                }
            }

            return redirect()->route('field_list')->with('response', ['status' => 'success', 'message' => 'Field added successfully']);

        } else {
            $field_types = array(
                'dropdown' => 'dropdown',
                'checkbox' => 'checkbox',
                'switch' => 'switch',
                'tagView' => 'tagView',
                'email' => 'email',
                'date' => 'date',
                'text' => 'input-SingleLine',
                'textArea' => 'input-MultiLine',
                'title' => 'title',
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
            'dropdown' => 'dropdown',
            'checkbox' => 'checkbox',
            'switch' => 'switch',
            'tagView' => 'tagView',
            'email' => 'email',
            'date' => 'date',
            'text' => 'input-SingleLine',
            'textArea' => 'input-MultiLine',
            'title' => 'title',
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

    public function field_edit_post(Request $request, $id)
    {
        $rules = [
            'label' => 'required|regex:/^[\s\w-]*$/',
            'fieldtype' => 'required',
            'dataTypes' => 'required',
        ];

        $messages = [
            'label.required' => 'Label is required',
            'fieldtype.required' => 'Field Type is required',
            'dataTypes.required' => 'Data type is required',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return redirect()->back()->withInput($request->all())->withErrors($validator);
        }

        if ($request->hasFile('icon')) {
            $icon_name = Str::uuid() . '.' . $request->file('icon')->getClientOriginalName();
            $path = Storage::disk('s3')->put('images', $request->icon);
            $iconPath = Storage::disk('s3')->url($path);
            $icon_mime = $request->file('icon')->getClientMimeType();
            $icon_ext = $request->file('icon')->extension();

            $file_data = [
                'id' => Str::uuid(),
                'key_name' => $icon_name,
                'extension' => $icon_ext,
                'name' => $icon_name,
                'mime' => $icon_mime,
                'relative_path' => '',
                'absolute_path' => $iconPath,
                'location' => 's3',
            ];

            $send_file_data = Files::create($file_data);
            $icon_id = $file_data['id'];
        } else {
            $get_icon_id = Fields::where('id', $id)->first();
            $icon_id = $get_icon_id->iconId;
        }

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

            if ($request->values !== null) {

                $set_field_id_null = [
                    'fieldId' => null,
                    'sort' => null,
                ];

                $reset_field_id = Values::where('fieldId', '=', $id)->update($set_field_id_null);

                $i = 1;
                foreach ($request->values as $value) {
                    $field_id = ['fieldId' => $id, 'sort' => $i];
                    Values::where('id', $value)->update($field_id);
                    $i++;
                }

                return redirect()->route('field_list')->with('response', ['status' => 'success', 'message' => 'Field updated successfully']);
            }

            return redirect()->route('field_list')->with('response', ['status' => 'success', 'message' => 'Field updated successfully']);

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
}
