<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;
use App\Models\login;
use Validator;
use Session;

class LoginController extends Controller
{
    public function login(Request $request) {

        // print_r("Hello world");
    	if ($request->isMethod('post')) {

    		$rules = [
                'username' => 'required',
                'password' => 'required'
            ];
            $messages = [
                'username' => 'username is required',
                'password' => 'password is required'
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if($validator->fails()){
                return redirect()->route('login_get')->withErrors($validator);
            }

    		$username = $request->input('username');
    		$password = $request->input('password');

    		$data = login::where([['username', $username], ['password', $password]])
    				// ->where('is_active', 1)
    				->select('*')
    				->first();

			if($data){
			    $request->session()->put(['username' => $username, 'role' => $data->role]);
    		    	return view('index');
    		}else 
    			    return redirect()->back()->with('response', ['status' => 'error', 'message' => 'Invalid login credientials']);
    	}
    	else 
    		return view('login');
    		
    }

    public function logout(Request $request){
        $request->session()->forget(['username', 'role']);
          return redirect()->route('login_get');
    }
}
