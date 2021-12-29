<?php
namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function user(Request $request)
    {
        $user_list = Users::paginate(30);
        return view('user.list', ['user_list' => $user_list]);
    }
    public function info($id)
    {
        $info = Users::where('id', $id)->first();
        return view('user.show', ['info' => $info]);
    }

    public function suspend(Request $request, $id)
    {
        $suspend_User = Users::where([['id', '=', $id], ['isSuspended', '=', 0]])->update(['isSuspended' => 1]);
        if ($suspend_User) {
            return redirect()->back()->with('response', ['status' => 'success', 'message' => 'User Suspended Successfully']);
        } else {
            return redirect()->back();
        }
    }
    public function unsuspend(Request $request, $id)
    {
        $unsuspend_User = Users::where([['id', '=', $id], ['isSuspended', '=', 1]])->update(['isSuspended' => 0]);
        if ($unsuspend_User) {
            return redirect()->back()->with('response', ['status' => 'success', 'message' => 'User Unsuspended Successfully']);
        } else {
            return redirect()->back();
        }
    }
    public function active($id)
    {
        $active_User = Users::where('id', $id)->update(['isActive' => 1]);
        if ($active_User) {
            return redirect()->back()->with('response', ['status' => 'success', 'message' => 'User Activated Successfully']);
        } else {
            return redirect()->back();
        }
    }
    public function deactive($id)
    {
        $deactive_User = Users::where('id', $id)->update(['isActive' => 0]);
        if ($deactive_User) {
            return redirect()->back()->with('response', ['status' => 'success', 'message' => 'User Deactivated Successfully']);
        } else {
            return redirect()->back();
        }
    }
    public function edit($id)
    {
        $data = Users::find($id);
        return view('user.update', ['data' => $data]);
    }
    public function update(Request $request)
    {
        $data = Users::find($request->id);
        $data->id = $request->id;
        $data->name = $request->name;
        $data->location = $request->location;
        $data->save();
        return redirect()->route('user')->with('response', ['status' => 'success', 'message' => 'User Updated successfully']);
    }
    public function delete($id)
    {
        $user_list = Users::find($id)->delete();
        return redirect()->back()->with('response', ['status' => 'success', 'message' => 'User Deleted Successfully']);
    }

    public function user_filter($action)
    {
        if ($action === 'active') {
            $user_list = Users::where('isActive', '=', '1')->paginate(30);
            return view('user.list', ['user_list' => $user_list]);
        } elseif ($action === 'inactive') {
            $user_list = Users::where('isActive', '=', '0')->paginate(30);
            return view('user.list', ['user_list' => $user_list]);
        } elseif ($action === 'suspended') {
            $user_list = Users::where('isSuspended', '=', '1')->paginate(30);
            return view('user.list', ['user_list' => $user_list]);
        } elseif ($action === 'unsuspended') {
            $user_list = Users::where('isSuspended', '=', '0')->paginate(30);
            return view('user.list', ['user_list' => $user_list]);
        }

    }
}
