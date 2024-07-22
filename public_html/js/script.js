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
            error: function (xhr) {
                errorCode(xhr.status)
            }
        });
    });


    //EDIT COMMENT
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


    //PATCH & STORE COMMENT
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
            error: function (xhr) {
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
            error: function (xhr) {
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
                    errorText(data, '#error-box');
                } else {
                    lastPage()
                }
            },
            error: function (xhr) {
                errorCode(xhr.status)
            }
        })
    })


    //REGISTRATION
    $(document).on('submit', '#registrationForm', function (event) {
        event.preventDefault();

        const form = $(this);

        $.ajax({
            url: form.attr('action'),
            type: 'POST',
            data: form.serialize(),
            dataType: 'json',
            success: function (data) {
                if (data.errors) {
                    errorText(data, '#error-box');
                } else {
                    lastPage()
                }
            },
            error: function (xhr) {
                errorCode(xhr.status)
            }
        })
    })


    //CREATE SLAM
    $(document).on('submit', '#createSlam', function (event) {
        event.preventDefault();

        const form = $(this);

        $.ajax({
            url: form.attr('action'),
            type: 'POST',
            data: form.serialize(),
            dataType: 'json',
            success: function (data) {
                if (data.errors) {
                    errorText(data, '#error-box');
                } else {
                    window.location.href = data.thisSlam
                }
            },
            error: function (xhr) {
                errorCode(xhr.status)
            }
        })
    })


    //EDIT SLAM
    $(document).on('submit', '#editSlam', function (event) {
        event.preventDefault();

        const form = $(this);

        $.ajax({
            url: form.attr('action'),
            type: 'POST',
            data: form.serialize(),
            dataType: 'json',
            success: function (data) {
                if (data.errors) {
                    errorText(data, '#error-box');
                } else {
                    lastPage()
                }
            },
            error: function (xhr) {
                errorCode(xhr.status)
            }
        })
    })


    //SORT
    $('#sort_by').on('change', function () {
        $('#slamsForm').submit();
    });

    $(document).on('submit', '#slamsForm', function (event) {
        event.preventDefault();

        const form = $(this);

        $.ajax({
            url: window.location.href,
            type: 'GET',
            data: form.serialize(),
            dataType: 'json',
            success: function (data) {
                allSlams(data, '#allPosts')
                pageNav(data);
            },
            error: function (xhr) {
                errorCode(xhr.status)
            }
        })
    })


    //PAGE NAVIGATION
    $(document).on('submit', '#pageNavForm', function (event) {
        event.preventDefault();

        const form = $(this);

        const clickedButtonValue = form.find('button[type="submit"]').filter(':focus').val()

        $.ajax({
            url: pageURL(clickedButtonValue),
            type: 'GET',
            data: form.serialize(),
            dataType: 'json',
            success: function (data) {
                allSlams(data, '#allPosts')
                pageNav(data);
            },
            error: function (xhr) {
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
            $('#' + key).attr({
                class: 'form-control is-invalid'
            })
            $('<p>').attr({
                id: 'errorText' + key,
                class: 'text-danger mt-2'
            }).text(data.errors.errors[key]).appendTo(box);
        }
    }
}

function lastPage() {
    window.location.href = localStorage.getItem('previousReferrer')
}

function removeDuplicateURI(key, value) {
    let currentURL = new URL(window.location.href);
    let queryParams = new URLSearchParams(currentURL.search);
    queryParams.delete(key);
    queryParams.append(key, value);
    return `${currentURL.pathname}?${queryParams.toString()}`;
}

function pageURL(key) {
    return removeDuplicateURI('page', key ?? 1);
}

function htmlspecialchars(str) {
    let map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return str.replace(/[&<>"']/g, function (m) {
        return map[m];
    });
}

function code(value) {
    //bold
    value = value.replace(/\*\*([^*]+)\*\*/g, '<span class="fw-bold">$1</span>');
    //italic
    value = value.replace(/\*([^*]+)\*/g, '<span class="fst-italic">$1</span>');
    //strikethrough
    value = value.replace(/~~([^~]+)~~/g, '<span class="text-decoration-line-through">$1</span>');
    //underline
    value = value.replace(/_([^_]+)_/g, '<span class="text-decoration-underline">$1</span>');
    //inline
    value = value.replace(/`([^`]+)`/g, '<span class="bg-secondary-subtle text-dark px-1" style="font-family:Consolas,serif">$1</span>');

    return value;
}

function postFormat(value) {
    value = htmlspecialchars(value);

    value = code(value);

    value = value.replace(/\n/g, '<br>');

    return value;
}

function allSlams(data, appendTo) {
    const container = $(appendTo).empty();

    if (data.posts.length > 0) {
        data.posts.forEach(post => {
            const a = $('<a>', {
                href: '/slam?id=' + post.id,
                class: 'list-group-item list-group-item-action d-flex gap-3 py-3'
            }).appendTo(container);

            $('<img>', {
                src: '../resources/' + post.image_url,
                alt: post.name,
                width: 32,
                height: 32,
                class: 'rounded-circle flex-shrink-0'
            }).appendTo(a);

            const div1 = $('<div>', {
                class: 'flex-grow-1 container'
            }).appendTo(a);

            // Title and content
            $('<h6>', {
                class: 'mb-0 overflow-break ellipsis-1',
                text: htmlspecialchars(post.title)
            }).appendTo(div1);

            $('<p>', {
                class: 'mb-0 opacity-75 overflow-break ellipsis-3',
                html: postFormat(post.content)
            }).appendTo(div1);

            // Stats container
            const div2 = $('<div>', {
                class: 'd-flex justify-content-start mt-2'
            }).appendTo(div1);

            $('<p>', {
                class: 'mb-0 text-danger',
                text: 'Likes: ' + post.num_likes
            }).appendTo(div2);

            $('<p>', {
                class: 'mb-0 mx-3 text-tertiary',
                text: 'Comments: ' + post.num_comments
            }).appendTo(div2);

            const div3 = $('<div>', {
                class: 'ms-auto text-end meta-container'
            }).appendTo(a);

            $('<small>', {
                class: 'opacity-50 text-nowrap',
                text: post.date
            }).appendTo(div3);

            $('<small>', {
                class: 'd-block mb-0 opacity-75',
                text: htmlspecialchars(post.name)
            }).appendTo(div3);
        });
    } else {
        $('<h1>', {
            class: 'my-5 text-secondary text-center'
        }).text('Wow, so empty... :3').appendTo(container);
    }
}

function pageNav(data) {
    $('#pageNavForm').empty();

    if (data.posts.length > 0) {
        let nav = $('<nav>').attr({
            class: 'd-flex justify-content-center',
            'aria-label': 'Standard pagination example'
        }).appendTo('#pageNavForm');

        let ul = $('<ul>').attr({
            class: 'pagination'
        }).appendTo(nav)

        let liBack = $('<li>').attr({
            class: 'page-item'
        }).appendTo(ul)

        let buttonBack = $('<button>').attr({
            class: 'page-link',
            type: 'submit',
            value: data.pages.back,
            'aria-label': 'Previous'
        }).appendTo(liBack)

        $('<span>').attr({
            'aria-hidden': true,
            class: 'text-dark fs-5'
        }).text('«').appendTo(buttonBack)

        for (let i = 0; i < Math.min(data.pages.last, 3); i++) {
            let liBetween = $('<li>').attr({
                class: 'page-item'
            }).appendTo(ul)

            $('<button>').attr({
                class: 'page-link text-dark fs-5',
                type: 'submit',
                value: i + 1
            }).text(i + 1).appendTo(liBetween)
        }

        if (data.pages.last > 3) {
            let liDots = $('<li>').attr({
                class: 'page-item'
            }).appendTo(ul)

            $('<button>').attr({
                class: 'page-link text-dark fs-5'
            }).text('...').appendTo(liDots)

            let liLast = $('<li>').attr({
                class: 'page-item'
            }).appendTo(ul)

            $('<button>').attr({
                class: 'page-link text-dark fs-5',
                type: 'submit',
                value: data.pages.last
            }).text(data.pages.last).appendTo(liLast)
        }

        let liNext = $('<li>').attr({
            class: 'page-item'
        }).appendTo(ul)

        let buttonNext = $('<button>').attr({
            class: 'page-link',
            type: 'submit',
            value: data.pages.next,
            'aria-label': 'Next'
        }).appendTo(liNext)

        $('<span>').attr({
            'aria-hidden': true,
            class: 'text-dark fs-5'
        }).text('»').appendTo(buttonNext)
    }
}

