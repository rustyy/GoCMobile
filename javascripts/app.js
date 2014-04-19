/**
 * Some initial variables to be set.
 * @type {*}
 */
var windowOrientation = window.orientation;
var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;

var getOrientation = function () {
    var wo = window.orientation;
    if (wo == 0 || wo == 180) {
        return 'portrait';
    }
    else {
        return 'landscape';
    }
};

var updateDimensions = function () {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
}

var updateMenu = function () {
    $('#menu').css({
        'height': windowHeight + 'px',
        'width': windowWidth + 'px',
        'top': -windowHeight + 'px'
    });

    if ($('#menu').hasClass('menu-visible')) {
        updateContentwrapper();
    }
};


var updateArticleContent = function () {
    $('#article-content').css({
        'height': windowHeight + 'px',
        'width': windowWidth + 'px',
        '-webkit-transform': 'translateX(' + windowWidth + 'px)',
        '-webkit-transition': '-webkit-transform .5s'

//        'right': windowWidth + 'px'
    });
};

var updateContentwrapper = function (hide) {
    $('#content-wrapper').css({
        'height': windowHeight + 'px',
        'width': windowWidth + 'px',
        'overflow': 'hidden'
    });
    $('.content-wrapper-inner').hide();
};

window.addEventListener('orientationchange', function () {
    updateDimensions();
    updateMenu();
    updateArticleContent();
});

var isStandalone = (function () {
    if (("standalone" in window.navigator) && window.navigator.standalone) {
        return true;
    }
    else {
        return false;
    }
})();

$(document).ready(function () {
    $(window).on('scroll', function () {
        updateDimensions();
        updateMenu();
        updateArticleContent();
    });

    updateMenu();
    updateArticleContent();

    $('#logo').on('click', function () {

        if ($('#menu').hasClass('menu-visible')) {
            $('#menu').addClass('menu-visible');

            $('#menu').css({
                'display': 'block',
                'top': -windowHeight + 'px',
                '-webkit-transform': 'translateY(' + -windowHeight + 'px)'
            });


            $('#menu').removeClass('menu-visible');
            $('#content-wrapper').removeAttr('style');
            $('.content-wrapper-inner').removeAttr('style');

        }
        else {
            setTimeout(updateContentwrapper, 500);

            $('#menu').css({
                'top': -windowHeight + $('body').scrollTop() + 'px'
            });

            $('#menu').addClass('menu-visible');

            $('#menu').css({
                'top': -windowHeight + $('body').scrollTop() + 'px',
                '-webkit-transform': 'translateY(' + windowHeight + 'px)'
            });
        }
    });

    // Prevent links to be opened in mobile safari.
    $('a').click(function () {

        $('#content-wrapper').css({
            'height': windowHeight + 'px',
            'width': windowWidth + 'px',
            'overflow': 'hidden'
        });


        $('#article-content').addClass('show');

        $('#article-content').css({

            'z-index': 300,
            '-webkit-transform': 'translateX(0)'

        });


        if (isStandalone) {
            event.preventDefault();
            //window.location = $(this).attr('href');
        }
    });
});