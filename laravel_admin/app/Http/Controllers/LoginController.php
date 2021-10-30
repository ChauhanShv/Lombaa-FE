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
    	if ($request->isMethod('post')) {
    		$rules = [
                'email' => 'required',
                'password' => 'required'
            ];
            $messages = [
                'email' => 'Email is required',
                'password' => 'password is required'
            ];
            $validator = Validator::make($request->all(), $rules, $messages);
            if($validator->fails()){
                return redirect()->route('login_get')->withErrors($validator);
            }
    		$username = $request->input('email');
    		$password = $request->input('password');
    		$data = login::where([['email', $username], ['password', $password]])
    				->select('*')
    				->first();
			if($data){
			    $request->session()->put(['email' => $username, 'role' => $data->role]);
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
