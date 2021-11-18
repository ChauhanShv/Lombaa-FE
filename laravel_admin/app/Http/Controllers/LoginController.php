<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;
use App\Models\Login;
use Validator;
use Session;

class LoginController extends Controller
{
    public function login(Request $request) {
    	if ($request->isMethod('post')) {
    		$rules = [
                'email' => 'required|email',
                'password' => 'required'
            ];
            $messages = [
                'email' => 'Email is required',
                'password' => 'password is required'
            ];
            $validator = Validator::make($request->all(), $rules, $messages);
            if($validator->fails()){
                return redirect()->route('login')->withErrors($validator);
            }
    		$username = $request->input('email');
    		$password = $request->input('password');
            if($request->rememberme===null){
                setcookie('login_email', $username,100 );
                setcookie('login_password', $password,100 );
            }else{
                setcookie('login_email',$username, time()+60*60*24*100 );
                setcookie('login_password', $password, time()+60*60*24*100 );
            }
    		$data = Login::where([['email', $username], ['password', $password]])
    				->select('*')
    				->first();
			if($data){
			    $request->session()->put(['email' => $username]);
    		    	return view('index');
    		}else 
    			    return redirect()->back()->with('response', ['status' => 'error', 'message' => 'Invalid login credientials']);
    	}
    	else 
    		return view('login');
    }
    public function logout(Request $request){
          Auth::logout();
          $request->session()->invalidate();
          $request->session()->regenerateToken();
          return redirect('/');
    }
}