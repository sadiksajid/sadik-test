<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use App\Repositories\Events\EventsRepository;
use App\Repositories\Events\EventsRepositoryInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(EventsRepositoryInterface::class, EventsRepository::class);

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
