<?php

namespace Core\Middleware;

class Auth
{
    public function handle(): void
    {
        if (!isset($_SESSION['user']) ?? false) {
            abort(1);
        }
    }
}
