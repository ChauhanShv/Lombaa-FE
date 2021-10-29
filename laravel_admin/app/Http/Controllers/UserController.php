<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use DB;

class UserController extends Controller
{
    public function user(Request $request) {
        $user_list = DB::table('users')->paginate(30);
          return view('user.list', ['user_list' => $user_list]);
    }
    public function info($id){
        $info = DB::table('users')->where('id', $id)->first();
        return view('user.show', ['info' => $info]);
    }
    public function suspend($id){
        $getUserSuspendStatus = DB::table('users')->where('id', $id)->where('isSuspended', 0)->get()->toArray();
        if(count($getUserSuspendStatus)==1){
            $suspendUser = DB::table('users')->where('id', $id)->update(['isSuspended' => 1]);
            return redirect()->back()->with('response', ['status' => 'success', 'message' => 'User Suspend successfully']);
        }else{
            return redirect()->back();
        }
    }
    public function unsuspend($id){
        $getUserUnSuspendStatus = DB::table('users')->where('id', $id)->where('isSuspended', 1)->get()->toArray();
        if(count($getUserUnSuspendStatus)==1){
            $UnsuspendUser = DB::table('users')->where('id', $id)->update(['isSuspended' => 0]);
            return redirect()->back()->with('response', ['status' => 'success', 'message' => 'User UnSuspend successfully']);
        }else{
            return redirect()->back();
        }
    }
    // public function delete($id){
    //     $user_delete = DB::table('users')->where('id', $id)->delete();
    //     return view('user.list', ['user_delete' => $user_delete]);
    // }
}