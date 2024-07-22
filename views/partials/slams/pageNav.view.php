<form id="pageNavForm" method="POST" action="/slams?page=">
    <?php if (count($posts) !== 0) : ?>
        <nav aria-label="Standard pagination example" class="d-flex justify-content-center">
            <ul class="pagination">
                <li class="page-item">
                    <button class="page-link" type="submit" value="<?= $pages['back'] ?>" aria-label="Previous">
                        <span aria-hidden="true" class="text-dark fs-5">«</span>
                    </button>
                </li>
                <?php for ($i = 0; $i < min($pages['last'], 3); $i++) : ?>
                    <li class="page-item">
                        <button class="page-link text-dark fs-5" type="submit" value="<?= $i + 1 ?>">
                            <?= $i + 1 ?>
                        </button>
                    </li>
                <?php endfor; ?>
                <?php if ($pages['last'] > 3) : ?>
                    <li class="page-item">
                        <button class="page-link text-dark fs-5" type="submit">
                            ...
                        </button>
                    </li>
                    <li class="page-item">
                        <button class="page-link text-dark fs-5" type="submit" value="$pages['last']">
                            <?= $pages['last'] ?>
                        </button>
                    </li>
                <?php endif; ?>
                <li class="page-item">
                    <button class="page-link" type="submit" value="<?= $pages['next'] ?>" aria-label="Next">
                        <span aria-hidden="true" class="text-dark fs-5">»</span>
                    </button>
                </li>
            </ul>
        </nav>
    <?php endif; ?>
</form>
