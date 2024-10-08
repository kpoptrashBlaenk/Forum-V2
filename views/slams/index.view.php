<?php
require basePath('views/partials/head.php');
require basePath('views/partials/header.php');
?>

<div class="mx-5">
    <div class="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
        <div class="list-group w-100">

            <form id="slamsForm" method="POST">
                <div class="mb-4 border border-secondary">
                    <div class="input-group">
                        <input type="search" class="form-control" placeholder="Search posts..." aria-label="Search"
                               name="search">
                        <button class="btn btn-primary" type="submit">Search</button>
                    </div>
                </div>

                <div class="my-3 d-flex justify-content-start">
                    <label for="sort_by" class="col-form-label me-2">Sort By:</label>
                    <div class="col-3">
                        <select class="form-select" id="sort_by" name="sort_by">
                            <option value="new" <?= isset($_SESSION['sort_by']) && $_SESSION['sort_by'] === 'new' ? 'selected' : '' ?>>New</option>
                            <option value="hot" <?= isset($_SESSION['sort_by']) && $_SESSION['sort_by'] === 'hot' ? 'selected' : '' ?>>Hot</option>
                            <option value="top" <?= isset($_SESSION['sort_by']) && $_SESSION['sort_by'] === 'top' ? 'selected' : '' ?>>Top</option>
                        </select>
                    </div>
                </div>
            </form>
            <div id="allPosts">
                <?php require basePath('views/partials/slams/index.view.php'); ?>
            </div>
        </div>
    </div>
</div>

<?php require basePath('views/partials/slams/pageNav.view.php') ?>

<?php
require basePath('views/partials/footer.php');
require basePath('views/partials/foot.php');
?>
