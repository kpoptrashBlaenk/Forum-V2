<script>

    //save scrolling
    window.onbeforeunload = function () {
        let currentPath = getCurrentPath();
        let storedPath = localStorage.getItem('storedPath');
        if (storedPath === currentPath) {
            if (<?= (isset($_GET['comment']) ? 'true' : 'false') ?>) {
                localStorage.setItem('scrollPosition', (document.getElementById('commentArea').offsetTop - 100).toString());
            } else {
                localStorage.setItem('scrollPosition', window.scrollY.toString());
            }
        }
    };

    window.onload = function () {
        let currentPath = getCurrentPath();
        let storedPath = localStorage.getItem('storedPath');
        if (storedPath === currentPath) {
            let storedScrollPosition = localStorage.getItem('scrollPosition');
            if (storedScrollPosition) {
                let scrollPosition = parseInt(storedScrollPosition) || 0;
                setTimeout(function () {
                    window.scrollTo(0, scrollPosition);
                    localStorage.removeItem('scrollPosition');
                }, 0);
            }
        }

        localStorage.setItem('storedPath', currentPath);
        localStorage.setItem('beforePreviousReferrer', localStorage.getItem('previousReferrer'));
        localStorage.setItem('previousReferrer', document.referrer);
    };

    function getCurrentPath() {
        return window.location.pathname;
    }

</script>
