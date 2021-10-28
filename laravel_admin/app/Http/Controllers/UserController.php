<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\users;

use Illuminate\Support\Facades\DB;



class UserController extends Controller
{
    public function user(Request $request) {
        $userlist = DB::table('users')->paginate(30);
          return view('user.list', ['userlist' => $userlist]);
    }
    public function info($id){
        $info = DB::table('users')->where('id', '=', $id)->first();
        return view('user.show', ['info' => $info]);
    }
}
