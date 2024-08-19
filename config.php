<?php

switch($_SERVER['HTTP_HOST']) {

    case 'hidden':
        return [
            'Database' => [
                'host' => 'hidden',
                'port' => 3306,
                'dbname' => 'hidden',
                'charset' => 'utf8mb4',
            ],
            'username' => 'hidden',
            'password' => 'hidden'
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
