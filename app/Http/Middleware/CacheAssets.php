<?php

namespace App\Http\Middleware;

use Closure;

class CacheAssets
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        $response->headers->set('Cache-Control', 'public, max-age=315360'); // 1 year
        return $response;
    }
}
