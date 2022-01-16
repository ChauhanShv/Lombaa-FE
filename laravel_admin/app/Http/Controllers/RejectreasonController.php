<?php

namespace App\Http\Controllers;

use App\Models\Rejectreason;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Str;

class RejectreasonController extends Controller
{
    public function reject_reason_list()
    {
        $data = Rejectreason::get();

        return view('products.reject_reason', ['data' => $data]);
    }

    public function reject_reason_add(Request $request)
    {
        // $rules = [
        //     'reason_body' => 'required',
        // ];

        // $messages = [
        //     'required ' => 'Mesaage field cannot be empty',
        // ];

        // $validator = Validartor::make($request->all(), $rules, $messages);

        // if ($validator->fails()) {
        //     return redirect()->back()->withInput($request->all())->withErrors($validator);
        // }

        $data = [
            'id' => Str::uuid(),
            'body' => $request->reason_body,
            'createdAt' => Carbon::now(),
            'updatedAt' => Carbon::now(),
        ];

        $data_added = Rejectreason::insert($data);

        if ($data_added) {

            return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Reject reason added successfully']);
        } else {
            return redirect()->back()->with('response', ['status' => 'unsuccessful', 'message' => 'Something went wrong']);
        }

    }

    public function reject_reason_edit(Request $request, $id)
    {

        $data = [
            'body' => $request->reason,
        ];

        $data_updated = Rejectreason::find($id)->update($data);

        if ($data_updated) {

            return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Reject reason updated successfully']);
        } else {
            return redirect()->back()->with('response', ['status' => 'unsuccessful', 'message' => 'Something went wrong']);
        }
    }

    public function reject_reason_delete(Request $request, $id)
    {

        $data_deleted = Rejectreason::find($id)->delete();

        if ($data_deleted) {

            return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Reject reason deleted successfully']);
        } else {
            return redirect()->back()->with('response', ['status' => 'unsuccessful', 'message' => 'Something went wrong']);
        }
    }
}
