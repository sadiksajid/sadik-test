<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class PasswordConfirmation
{
    public function handle($request, Closure $next)
    {
        $confirmedAt = session('password_confirmed_at');
        if ($confirmedAt && Carbon::parse($confirmedAt)->addMinutes(config('auth.password_timeout', 15))->isFuture() or request()->is('admin/caisse') == true   or request()->is('admin/caisse/ads') == true or Auth::user()->store->double_auth == 0 or Auth::check() == false) {
            return $next($request);
        }
        session(['url.intended' => url()->current()]);
        return redirect()->route('password.confirm.form');
    }
}