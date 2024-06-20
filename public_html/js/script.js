document.addEventListener('DOMContentLoaded', function () {
    const likeButton = $('#likePostButton');

    $('#likePostForm').on('submit', function (event) {
        event.preventDefault();

        $.ajax({
            url: '/slam/like',
            type: 'POST',
            data: $('#likePostForm').serialize(),
            dataType: 'json',
            success: function (data) {
                likeButton.html(data.user_has_liked > 0
                    ? `Unlike: ${data.num_likes}`
                    : `Like: ${data.num_likes}`);
                likeButton.toggleClass('btn-danger btn-secondary');
            },
            error: function (xhr, status, error) {
                errorCode(xhr.status)
            }
        });
    });

    $(document).on('submit', '.deleteCommentForm', function (event) {
        event.preventDefault();

        form = $(this);

        $.ajax({
            url: form.attr('action'),
            type: 'POST',
            data: form.serialize(),
            dataType: 'json',
            success: function (data) {
                console.log(data)
            },
            error: function (xhr, status, error, data) {
                errorCode(xhr.status)
            }
        });
    });
});

function errorCode(code) {
    switch (code) {
        case 1: //auth
            window.location.href = '/session';
            break;

        case 2: //guest
            window.location.href = '/';
            break;

        case 403: //forbidden
            window.location.href = '/403';
            break;

        case 404: //not found
            window.location.href = '/404';
            break;

        default:
            window.location.href = '/500';
    }
}
