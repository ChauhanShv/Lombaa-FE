<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invoice;
use App\Models\UserPackage;
use App\Models\Packages;
use Carbon\Carbon;
use Str;

class InvoiceController extends Controller
{
    public function invoice_list() {
        $invoices = Invoice::get();
        return view('invoice.list', ['invoices' => $invoices]);
    }

    public function status_upated(Request $request, $id) {
         $invoice = Invoice::where('id', $id)->first();
         $package = Packages::where('id', $invoice->packageId)->first();
         $uptade_invoice = Invoice::where([['id', $id],['status', 'unpaid']])->update(['status' => 'paid']);

         if($uptade_invoice) {
            $user_package = new UserPackage;
            $user_package->id = Str::uuid();
            $user_package->userId = $invoice->userId;
            $user_package->packageName = $package->name;
            $user_package->packageDescription = $package->description;
            $user_package->packageId = $invoice->packageId;
            $user_package->save();

            return redirect()->back()->with('response', ['status' => 'success', 'message' => 'Invoice paid successfully ']);
         }
         else{
            return redirect()->back()->with('response', ['status' => 'error', 'message' => 'Something Went wrong']);
         }
    }
}
