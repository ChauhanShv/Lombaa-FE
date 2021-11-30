<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Fields;
use App\Models\Files;
use App\Models\Values;
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
                'icon' => 'required',
                'valueIcon' => 'required|array',
                'field_name' => 'required|array'

            ];

            $messages = [
                    'label.required' => 'Label is required',
                    'fieldtype.required' => 'Field Type is required',
                    'icon.required' => 'Icon is required',
                    'valueIcon.required' => 'Value icon is required',
                    'field_name.required' => 'Field value name is required'
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }

            $iconName = Str::uuid().'.'.$request->file('icon')->getClientOriginalName();
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

            $fieldIconsArray = $request->file('valueIcon');
            $fieldValueStringArray = $request->field_name;
            $field_values = array();

            foreach( array_combine($fieldValueStringArray, $fieldIconsArray) as $fieldvalues => $fieldIcon ){

                $fieldIconName = Str::uuid().'.'.$fieldIcon->getClientOriginalName();
                // $path = Storage::disk('s3')->put('images', $fieldIcon);
                // $iconPath = Storage::disk('s3')->url($path);
                $fieldiconMime = $fieldIcon->getClientMimeType();
                $fieldiconExt = $fieldIcon->extension();
                
    
                $fieldFileData = [
                    'id' => Str::uuid(),
                    'key_name' => $fieldIconName,
                    'extension' => $fieldiconExt,
                    'name' => $fieldIconName,
                    'mime' =>  $fieldiconMime,
                    'relative_path' => '',
                    // 'absolute_path'=> $iconPath,
                    'absolute_path'=> 'https://lomba-task-temp.s3.ap-south-1.amazonaws.com/images/L27xI2KWxQerlkrlwWnPvHl0BJDLnfRzpRaQjrQb.jpg',
                    'location' => 's3',
                    'createdAt'=> Carbon::now(),
                    'updatedAt' => Carbon::now()
    
                ];
    
                $sendFieldFileData = Files::insert($fieldFileData);

                $field_value = array();

                $field_value['id'] = Str::uuid();
                $field_value['value'] = $fieldvalues;
                $field_value['fieldId'] = $data['id'];
                $field_value['iconId'] = $fieldFileData['id'];
                $field_value['createdAt'] =  Carbon::now();
                $field_value['updatedAt'] = Carbon::now();

                array_push($field_values, $field_value);

            }

            $sendFieldValues = FieldValues::insert($field_values);

            return redirect()->route('fields')->with('response', ['status' => 'success', 'message' => 'Field added successfully']);

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

        $fields_list = Fields::with('icon')->paginate(30);

        $field_values = Values::get();
        return view('fields.fieldlist', ['fields_list' => $fields_list, 'field_values' => $field_values]);

    }
    
    public function field_edit($id) {

        $fieldtypes = array (
            'Label' => 'Label',
            'Dropdown' => 'Dropdown',
            'Checkbox' => 'Checkbox',
            'Switch' => 'Switch',
            'Tag View' =>' Tag View'
            );

         $fields = Fields::with(['values', 'values.icon', 'icon'])->find($id);

        return view('fields.fieldupdate', ['id' => $id, 'fieldtypes' => $fieldtypes, 'fields' => $fields]);

    }

    public function field_edit_post() {



    }

    public function update_icon($label, $value, $id) {

        $icon = Files::where('id', $id)->first();

        return view('fields.updateicon', ['icon' => $icon, 'label' => $label, 'value' => $value]);

    }

    public function update_icon_post(Request $request, $label, $value, $id) {

        $rules = [
            'icon' => 'required'
        ];

        $messages = [
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

        $sendFileData = Files::where('id', $id)->update($fileData);

        return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Icon updated successfully']);
    }
}
