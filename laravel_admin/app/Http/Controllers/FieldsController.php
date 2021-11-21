<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Fields;
use App\Models\Files;
use App\Models\FieldValues;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Str;


class FieldsController extends Controller
{
    public function fields(Request $request){
        if($request->isMethod('post')){
            $rules = [
                'label' => 'required|regex:/^[\s\w-]*$/',
                'fieldtype' => 'required',
                'icon' => 'required'
            ];

            $messages = [
                    'label.required' => 'Label is required',
                    'fieldtype.required' => 'Field Type is required',
                    'icon.required' => 'Icon is required'
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            $iconName = Str::uuid().'.'.$request->file('icon')->getClientOriginalName();
            // $path = Storage::disk('s3')->put('images', $request->icon);
            // $iconPath = Storage::disk('s3')->url($path);
            $iconMime = $request->file('icon')->getClientMimeType();
            $iconExt = $request->file('icon')->extension();
            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }

            $fileData = [
                'id' => Str::uuid(),
                'key_name' => $iconName,
                'extension' => $iconExt,
                'name' => $iconName,
                'mime' => $iconMime,
                'relative_path' => '',
                // 'absolute_path'=> $iconPath,
                'absolute_path'=> 'https://lomba-task-temp.s3.ap-south-1.amazonaws.com/images/L27xI2KWxQerlkrlwWnPvHl0BJDLnfRzpRaQjrQb.jpg',
                'location' => 's3',
                'createdAt'=> Carbon::now(),
                'updatedAt' => Carbon::now()

            ];

            $sendFileData = Files::insert($fileData);
            
            if( $sendFileData ){
                $data = [
                    'id' => Str::uuid(),
                    'label' => $request->label,
                    'isRequired' => isset($request->required) ? 1 : 0,
                    'isActive' => isset($request->active) ? 1 : 0,
                    'dataTypes' => $request->datatype,
                    'fieldType' => $request->fieldtype,
                    'sortOrder' => null,
                    'iconId' => $fileData['id'],
                    'createdAt' => Carbon::now(),
                    'updatedAt' => Carbon::now()
                ];
                $sendData = Fields::insert($data);

            }else{
                return redirect()->route('fields')->with('response', ['status' => 'success', 'message' => 'Something went wrong']);

            }

            $fieldValueString = $request->fieldvalue;
            $fieldValueStringArray = explode(',', $fieldValueString);


            $field_values = array();

            foreach($fieldValueStringArray as $fieldvalues) {
                $field_value = array();

                $field_value['id'] = Str::uuid();
                $field_value['value'] = $fieldvalues;
                $field_value['fieldId'] = $data['id'];
                $field_value['iconId'] = null;
                $field_value['createdAt'] =  Carbon::now();
                $field_value['updatedAt'] = Carbon::now();

                array_push($field_values, $field_value);
            }

            $sendFieldValues = FieldValues::insert($field_values);

            return redirect()->route('fields')->with('response', ['status' => 'success', 'message' => 'Fields added successfully']);

        }

        else{

            $fieldtypes = array (
                'Label' => 'Label',
                'Dropdown' => 'Dropdown',
                'Checkbox' => 'Checkbox',
                'Switch' => 'Switch',
                'Tag View' =>' Tag View'
                );

                return view('fields.addfields', ['fieldtypes' => $fieldtypes]);
        }
    }

    public function field_list() {


    }
}
