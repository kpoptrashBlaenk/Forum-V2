<?php

use Core\App;
use Core\Database;
use Core\Session;

$db = App::resolve(Database::class);

$categories = $db->query('select * from category')->get();

view('slams/create.view.php', [
    'categories' => $categories,
]);
