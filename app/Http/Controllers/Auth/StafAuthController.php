<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class StafAuthController extends Controller
{

    use AuthenticatesUsers;
    protected $redirectTo = '/admin/events';

    public function __construct()
    {
        

    }





    public function showLoginForm()
    {

        if(Auth::check()){
            return redirect()->route('staf.products');
        }else{
            return view('auth.login');
        }
    }



    public function login(Request $request)
    {
        $request->session()->invalidate();

        $request->session()->regenerateToken();

        $this->validateLogin($request);

        if (method_exists($this, 'hasTooManyLoginAttempts') &&
            $this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password], $request->remember)) {
            return redirect()->intended(route('admin.index'));
        }

        return back()->withInput($request->only('email', 'remember'))->withErrors(['email' => 'These credentials do not match our records.']);


        // If the login attempt was unsuccessful we will increment the number of attempts
        // to login and redirect the user back to the login form. Of course, when this
        // user surpasses their maximum number of attempts they will get locked out.
        $this->incrementLoginAttempts($request);

        return $this->sendFailedLoginResponse($request);
    }



    protected function credentials(Request $request)
    {

        if (is_numeric($request->input('email'))) {
            return ['phone' => $request->input('email'), 'password' => $request->input('password')];
        } elseif (filter_var($request->input('email'), FILTER_VALIDATE_EMAIL)) {
            return ['email' => $request->input('email'), 'password' => $request->input('password')];
        } else {
            $this->validateLogin($request);
        }

    }
    protected function validateLogin(Request $request)
    {

        $request->validate([
            $this->username() => 'required|string',
            'password' => 'required',
        ]);

        $user = null;
        if (is_numeric($request->input('email'))) {
            $user = User::where('phone', '=', $request->input('email'))->where('status', 1)->first();

        } elseif (filter_var($request->input('email'), FILTER_VALIDATE_EMAIL)) {
            $user = User::where('email', '=', $request->input('email'))->where('status', 1)->first();
        }
        if (!$user) {
            return redirect()->back()->with('error', 'Email-Address Or Password Are Wrong !');
        }
    }
    public function logout(Request $request)
    {
        Auth::logout();
        return redirect('/');
    }
}
