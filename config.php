<?php

switch($_SERVER['HTTP_HOST']) {

    case 'fbaggiokostportfolio.000webhostapp.com':
        return [
            'Database' => [
                'host' => 'localhost',
                'port' => 3306,
                'dbname' => 'id21834925_forumdb',
                'charset' => 'utf8mb4',
            ],
            'username' => 'id21834925_slam2325',
            'password' => 'P4$$w0rd'
            ];
        break;

    default:
        return [
            'Database' => [
                'host' => 'localhost',
                'port' => 3306,
                'dbname' => 'myapp',
                'charset' => 'utf8mb4',
            ],
            'username' => 'root',
            'password' => ''
        ];
        break;
}
