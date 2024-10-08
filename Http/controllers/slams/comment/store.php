<?php

use Core\App;
use Core\Database;
use Http\Forms\CommentForm;

$form = CommentForm::validate($attributes = [
    'title' => $_POST['comment']
]);

$db = App::resolve(Database::class);

$db->query('INSERT INTO comments(user_id, post_id, comment) VALUES(:user_id, :post_id, :comment)', [
    'user_id' => $_SESSION['user']['user_id'],
    'post_id' => $_POST['post_id'],
    'comment' => $_POST['comment']
]);

echo json_encode(['success' => true, 'message' => 'Comment stored successfully'], JSON_THROW_ON_ERROR);
