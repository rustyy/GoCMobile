/**
 * Some initial variables to be set.
 * @type {*}
 */
//var windowOrientation = window.orientation;
//var windowHeight = window.innerHeight;
//var windowWidth = window.innerWidth;


var globalData = {
    wHeight: window.innerHeight,
    wWidth: window.innerWidth,
    updateDimensions: function () {
        this.wHeight = window.innerHeight;
        this.wWidth = window.innerWidth;
        this.updateMenu();
    },
    orientation: function () {
        if (window.orientation == 0 || window.orientation == 180)
            return'portrait';
        return 'landscape';
    },
    isStandalone: (function () {
        if (("standalone" in window.navigator) && window.navigator.standalone) {
            return true;
        }
        else {
            return false;
        }
    })(),
    updateMenu: function () {
        $('#menu').css({
            'height': this.wHeight + 'px',
            'width': this.wWidth + 'px',
            '-webkit-transform': 'translateY(' + -this.wHeight + 'px)'
        });
    },
    'menuCSSqueues': function (toggle) {
        var queues = {
            'show': [
                {'-webkit-transform': 'translateY(0)'},
                {'display': 'block'}
            ],
            'hide': [
                {'-webkit-transform': 'translateY(-' + this.wHeight + 'px)'}
            ]
        }
        return queues[toggle];
    },

    'menuCSStoggle': function (toggle, el) {
        // Clone queue.
        var queue = this.menuCSSqueues(toggle).concat([]);
        var timeout = 1;
        // Handle the css styling queue.
        (function loop() {
            setTimeout(function () {
                if (queue.length > 0) {
                    el.css(queue.pop());
                    loop();
                }
                // Wait for the animation to be finished.
                // Afterwards hide menu again.
                if (queue.length == 0 && toggle == 'hide')
                    setTimeout(function () {
                        el.css({'display': 'none'})
                    }, 500);

            }, timeout);
        })();
    }
};

var getContent = function (cat, nid) {




    $.ajax({
        type: 'GET',
        url: 'http://goc.local/jsontest',
        jsonCallback: 'jsonCallback',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function (data, status) {
            $.each(data['nodes'], function (i, node) {

                $.each(node, function (key, value) {
                    console.log(key);
                    $('.content-wrapper-inner')
                        .append('<div class="teaser">' +
                            '<h1>' + value.field_kicker + '</h1>' +
                            '<h2>' + value.title + '</h2>' +
                            '</div>');
                });


            });
        }
    })
};


window.addEventListener('orientationchange', function () {
    globalData.updateDimensions();
});


$(document).ready(function () {
    var menu = $('#menu');

    globalData.updateDimensions();

    $(document).on('scroll', function (e) {
        if (!menu.hasClass('menu-visible'))
            globalData.updateDimensions();
    });

    $(document).on('touchstart', function () {
    });
    $(document).on('touchmove', function (e) {
        if (menu.hasClass('menu-visible'))
            e.preventDefault();
    });
    $(document).on('touchend', function () {
    });


    // Show menu.
    $('#logo').on('click', function () {
        menu = $('#menu');
        if (menu.hasClass('menu-visible')) {
            globalData.menuCSStoggle('hide', menu);
            menu.removeClass('menu-visible');
        }
        else {
            menu.addClass('menu-visible');
            globalData.menuCSStoggle('show', menu);
        }
    });


//    $('#logo').on('click', function () {
//
//        if ($('#menu').hasClass('menu-visible')) {
//            $('#menu').addClass('menu-visible');
//
//            $('#menu').css({
//                'display': 'block',
//                'top': -windowHeight + 'px',
//                '-webkit-transform': 'translateY(' + -windowHeight + 'px)'
//            });
//
//
//            $('#menu').removeClass('menu-visible');
//            $('#content-wrapper').removeAttr('style');
//            $('.content-wrapper-inner').removeAttr('style');
//
//        }
//        else {
//            setTimeout(updateContentwrapper, 500);
//
//            $('#menu').css({
//                'top': -windowHeight + $('body').scrollTop() + 'px'
//            });
//
//            $('#menu').addClass('menu-visible');
//
//            $('#menu').css({
//                'top': -windowHeight + $('body').scrollTop() + 'px',
//                '-webkit-transform': 'translateY(' + windowHeight + 'px)'
//            });
//        }
//    });

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