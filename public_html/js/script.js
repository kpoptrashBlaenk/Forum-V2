document.addEventListener('DOMContentLoaded', function () {
    const likeButton = $('likePostButton');

    $('#likePostForm').on('submit', function (event) {
        event.preventDefault();

        $.ajax({
            url: '/slam/like',
            type: 'POST',
            data: $('#likePostForm').serialize(),
            dataType: 'json',
            success: function (data) {
                likeButton.innerHTML = data.user_has_liked > 0
                    ? `Unlike: ${data.num_likes}`
                    : `Like: ${data.num_likes}`;
                likeButton.classList.toggle('btn-danger');
                likeButton.classList.toggle('btn-secondary');
            },
            error: function (xhr, status, error) {
                window.location.href = '/session';
            }
        });

    });
});

