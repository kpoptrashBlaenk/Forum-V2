document.addEventListener('DOMContentLoaded', function () {

    //LIKE & DISLIKE
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


    //EDIT & STORE COMMENT
    let edit = false;

    $('.editCommentButton').on('click', function () {
        let commentCardBody = $(this).closest('.card-body');
        if (!edit) {
            edit = true;

            $('<input>').attr({
                type: 'hidden',
                name: '_method',
                value: 'PATCH'
            }).appendTo('#commentArea');

            $('<button>').attr({
                id: 'cancelEditComment',
                type: 'button',
                class: 'btn btn-danger'
            }).text('Cancel').appendTo('#commentArea');
        }

        $('#commentId').val(commentCardBody.find('.card-text').attr('id'));
        $('#comment').val(commentCardBody.find('.card-text').text());
    });

    $('#commentArea').on('click', '#cancelEditComment', function () {
        $('#commentArea').find('input[name="_method"]').remove();

        $(this).remove();

        $('#commentId').val('');
        $('#comment').val('');

        edit = false;
    });

    $(document).on('submit', '#commentArea', function (event) {
        event.preventDefault();

        const form = $(this);

        $.ajax({
            url: form.attr('action'),
            type: 'POST',
            data: form.serialize(),
            dataType: 'json',
            success: function (data) {
                if (data.errors) {
                    errorText(data, '#error-box')
                } else {
                    location.reload();
                }
            },
            error: function (xhr, status, error, data) {
                errorCode(xhr.status)
            }
        });
    });


    //DELETE COMMENT
    $(document).on('submit', '.deleteCommentForm', function (event) {
        event.preventDefault();

        const form = $(this);

        $.ajax({
            url: form.attr('action'),
            type: 'POST',
            data: form.serialize(),
            dataType: 'json',
            success: function () {
                location.reload();
            },
            error: function (xhr, status, error, data) {
                errorCode(xhr.status)
            }
        });
    });

    //LOGIN
    $(document).on('submit', '#loginForm', function (event) {
        event.preventDefault();

        const form = $(this);

        $.ajax({
            url: form.attr('action'),
            type: 'POST',
            data: form.serialize(),
            dataType: 'json',
            success: function (data) {
                if (data.errors) {
                    errorText(data,'#error-box');
                    $('#email').attr({
                        class: 'form-control is-invalid'
                    })
                    $('#password').attr({
                        class: 'form-control is-invalid'
                    })
                } else {
                    lastPage()
                }
            },
            error: function (xhr, status, error, data) {
                errorCode(xhr.status)
            }
        })
    })
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

function errorText(data, box) {
    $(box).empty();
    for (let key in data.errors.errors) {
        if (data.errors.errors.hasOwnProperty(key)) {
            return $('<p>').attr({
                id: 'errorText' + key,
                class: 'text-danger mt-2'
            }).text(data.errors.errors[key]).appendTo(box);
        }
    }
}

function lastPage() {
    window.location.href = localStorage.getItem('previousReferrer')
}
