<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Users;

class UserController extends Controller
{
    public function user(Request $request) {
        $user_list = Users::paginate(30);
          return view('user.list', ['user_list' => $user_list]);
    }
    public function info($id){
        $info = Users::where('id', $id)->first();
        return view('user.show', ['info' => $info]);
    }
    public function suspend(Request $request, $id){
        $suspend_User = Users::where([['id', '=', $id], ['isSuspended', '=', 0]])->update(['isSuspended' => 1]);
        if($suspend_User){
            return redirect()->back()->with('response', ['status' => 'success', 'message' => 'User Suspend Successfully']);
        }else{
            return redirect()->back();
        }
    }
    public function unsuspend($id){
        $unsuspend_User = Users::where([['id', '=', $id], ['isSuspended', '=', 1]])->update(['isSuspended' => 0]);
        if($unsuspend_User){
            return redirect()->back()->with('response', ['status' => 'success', 'message' => 'User UnSuspend Successfully']);
        }else{
            return redirect()->back();
        }
    }
    public function active($id){
            $active_User = Users::where([['id', '=', $id], ['isActive', '=', 0]])->update(['isActive' => 1]);
            if($active_User){
            return redirect()->back()->with('response', ['status' => 'success', 'message' => 'User Active Successfully']);
        }else{
            return redirect()->back();
        }
    }
    public function deactive($id){
            $deactive_User = Users::where([['id', '=', $id], ['isActive', '=', 1]])->update(['isActive' => 0]);
            if($deactive_User){
            return redirect()->back()->with('response', ['status' => 'success', 'message' => 'User Deactive Successfully']);
        }else{
            return redirect()->back();
        }
    }
    public function delete($id){
        $user_list = Users::find($id)->delete();
        return redirect()->back()->with('response', ['status' => 'success', 'message' => 'User Deleted Successfully']);
    }
}