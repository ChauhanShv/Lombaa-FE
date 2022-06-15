<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invoices;
use App\Models\UserPackage;
use Carbon\Carbon;
use Str;

class InvoiceController extends Controller
{
    public function invoice_list() {
        $invoices = Invoices::get();
        return view('invoice.list', ['invoices' => $invoices]);
    }

    public function status_upated(Request $request, $id) {
         $package_id = Invoices::where('id', $id)->select('packageId')->first();
         $uptade_invoice = Invoices::where([['id', $id],['status', 'unpaid']])->update(['status' => 'paid']);

         if($uptade_invoice) {
            return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Invoice paid successfully ']);
         }
         if($uptade_invoice) {
            return redirect()->back()->with('response', ['status' => 'erroe', 'message' => 'Something Went wrong']);
         }
    }
}
