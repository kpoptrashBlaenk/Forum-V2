<?php

use Core\App;
use Core\Database;

$page = $_GET['page'] ?? 1;

$db = App::resolve(Database::class);

$query = 'select posts.*, users.username, category.image_url, category.name,
                        (select count(*) from likes where likes.post_id = posts.id) as num_likes,
                        (select count(*) from comments where comments.post_id = posts.id) as num_comments
                        from posts
                        join users on posts.user_id = users.user_id
                        join category on posts.category_id = category.id';

$params = [];
$where = [];
$orderBy = [];

if (isset($_GET['category'])) {
    $where[] = 'category.id = :category';
    $params['category'] = $_GET['category'];
}

if (isset($_GET['search'])) {
    $where[] = '(posts.content like :search or posts.title like :search)';
    $params['search'] = '%' . $_GET['search'] . '%';
}

isset($_GET['sort_by']) ? $_SESSION['sort_by'] = $_GET['sort_by'] : false;

$sort_by = $_SESSION['sort_by'] ?? 'new';

switch ($sort_by) {
    case 'new':
        $orderBy[] = 'posts.date desc';
        break;
    case 'hot':
        $one_week_ago = date('Y-m-d H:i:s', strtotime('-1 week'));
        $where[] = 'posts.date >= :one_week_ago';
        $orderBy[] = 'num_likes desc';
        $params['one_week_ago'] = $one_week_ago;
        break;
    case 'top':
        $orderBy[] = 'num_likes desc';
        break;
    default:
        break;
}

if (!empty($where)) {
    $query .= ' where ' . implode(' and ', $where);
}

if (!empty($orderBy)) {
    $query .= ' order by ' . implode(', ', $orderBy);
}

$limit = 5;

$lastPage = ceil(count($db->query($query, $params)->get()) / $limit);

$postsLength = ($page - 1) * $limit;

$query .= " limit {$limit} offset {$postsLength}";

$posts = $db->query($query, $params)->get();

$pages = [
    'back' => (max((int)$page - 1, 1)),
    'next' => min((int)$page + 1, $lastPage),
    'last' => $lastPage
];

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
    echo json_encode(['error' => false, 'success' => true, 'posts' => $posts, 'pages' => $pages, 'query' => $query], JSON_THROW_ON_ERROR);
} else {
    view('slams/index.view.php', [
        'posts' => $posts,
        'sort_by' => $sort_by,
        'pages' => $pages
    ]);
}
