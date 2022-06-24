<?php

namespace App\Http\Controllers;

use App\Models\MerchantBank;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MerchantController extends Controller
{
    public function add_bank(Request $request)
    {
        if ($request->isMethod('post')) {
            $rules = [
                'bank' => 'required',
                'acct_name' => 'required',
                'acct_num' => 'required | max:20',
                'sort_code' => 'required | max:15',

            ];
            $messages = [
                'bank.required' => 'bank name is required',
                'acct_name.required' => 'Account holder name is required',
                'acct_num.required' => 'Account number is required',
                'acct_num.max' => 'Not more then 20 digits',
                'sort_code.required' => 'Sort code is required',
                'sort_code.max' => 'Not more then 15 digits'

            ];
            $validator = Validator::make($request->all(), $rules, $messages);
            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }
            $merchantBank = new MerchantBank();
            $merchantBank->bank = $request->bank;
            $merchantBank->acct_name = $request->acct_name;
            $merchantBank->acct_number = $request->acct_num;
            $merchantBank->acct_sort_code = $request->sort_code;

            if ($merchantBank->save()) {
                return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Bank details added successfully']);
            } else {
                return redirect()->back()->with('response', ['status' => 'error', 'message' => 'Something went wrong']);
            }
        } else {
            return view('merchant.add');
        }
    }
    public function list(Request $request)
    {
        $merchant_bank_detail = MerchantBank::get();
        return view('merchant.list', ['merchant_bank_detail' => $merchant_bank_detail]);
    }

    public function delete(Request $request, $id)
    {
        MerchantBank::find($id)->delete();
        return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Bank details deleted successfully']);
    }

    public function update_bank(Request $request, $id)
    {
        if ($request->isMethod('post')) {
            $rules = [
                'bank' => 'required',
                'acct_name' => 'required',
                'acct_num' => 'required | max:20',
                'sort_code' => 'required | max:15',

            ];
            $messages = [
                'bank.required' => 'bank name is required',
                'acct_name.required' => 'Account holder name is required',
                'acct_num.required' => 'Account number is required',
                'acct_num.max' => 'Not more then 20 digits',
                'sort_code.required' => 'Sort code is required',
                'sort_code.max' => 'Not more then 15 digits'

            ];
            $validator = Validator::make($request->all(), $rules, $messages);
            if ($validator->fails()) {
                return redirect()->back()->withInput($request->all())->withErrors($validator);
            }
            $bank_name = $request->input('bank');
            $account_name = $request->input('acct_name');
            $account_number = $request->input('acct_num');
            $sort_code = $request->input('sort_code');

            $data = [
                'bank' => $bank_name,
                'acct_name' => $account_name,
                'acct_number' => $account_number,
                'acct_sort_code' => $sort_code
            ];

            $update_bank = MerchantBank::where('id', $id)->update($data);
            try {
                return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Bank details updated successfully']);
            } catch (Exception $e) {
                return redirect()->back()->with('response', ['status' => 'Failed', 'message' => 'Something went wrong']);
            }
        } else {
            $bank_details = MerchantBank::where('id', $id)->first();
            return view('merchant.update', ['id' => $id, 'bank_details' => $bank_details]);
        }
    }
}
