<?php

namespace App\Http\Middleware;

use Closure;

class AdminAuth
{
    // Very simple middleware that accepts a static token
    public function handle($request, Closure $next)
    {
        $auth = $request->header('Authorization');
        if (!$auth) return response()->json(['message'=>'Unauthorized'], 401);
        if (strpos($auth, 'Bearer ') === 0) {
            $token = substr($auth, 7);
            if ($token === env('ADMIN_TOKEN', 'admintoken123')) {
                return $next($request);
            }
        }
        return response()->json(['message'=>'Unauthorized'], 401);
    }
}
