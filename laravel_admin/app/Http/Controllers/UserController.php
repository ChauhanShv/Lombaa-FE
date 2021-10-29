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
}