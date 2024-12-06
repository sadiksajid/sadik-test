<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // $ip =  'IP address = '.$_SERVER['HTTP_X_REAL_IP'];   
        if (!$this->app->environment('local')) {
            URL::forceScheme('https');
        }

    }
}
