<?php

use Core\App;
use Core\Database;

$db = App::resolve(Database::class);

$comment = $db->query('SELECT * FROM comments WHERE id = :id', ['id' => $_POST['comment_id']])->findOrFail();

authorize($comment['user_id'] === $_SESSION['user']['user_id']);

$db->query('DELETE FROM comments WHERE id = :id', ['id' => $_POST['comment_id']]);

echo json_encode(['success' => true, 'message' => 'Comment deleted successfully', 'id' => $_POST['post_id']], JSON_THROW_ON_ERROR);
