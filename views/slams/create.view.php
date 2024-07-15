<?php
require basePath('views/partials/head.php');
require basePath('views/partials/header.php');
?>

<div class="container my-5">
    <h1 class="mb-4">Create a Slam</h1>
    <form action="/slams/create" method="POST" id="createSlam">
        <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input type="text" class="form-control" id="title" name="title">
        </div>
        <div class="mb-3">
            <label for="content" class="form-label">Content</label>
            <textarea class="form-control" id="content" name="content" rows="5"></textarea>
        </div>
        <div class="mb-3">
            <label for="category" class="form-label">Tag</label>
            <select class="form-select" id="category" name="category">
                <option value="" selected>Select a category</option>
                <?php foreach ($categories as $category) : ?>
                    <option value="<?= $category['id'] ?>"><?= $category['name'] ?></option>
                <?php endforeach; ?>
            </select>
        </div>
        <div id="error-box"></div>
        <button type="submit" class="btn btn-primary">Post</button>
    </form>
</div>

<?php
require basePath('views/partials/footer.php');
require basePath('views/partials/foot.php');
?>
