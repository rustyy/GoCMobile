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

var teaserConf = {
    'teaserBig': {
        'classes': 'teaser teaser-big',
        'TagKicker': 'h2',
        'TagHeadline': 'h3'
    },
    'teaserMedium': {
        'classes': 'teaser teaser-medium',
        'TagKicker': 'h2',
        'TagHeadline': 'h3'
    },
    'teaserSmall': {
        'classes': 'teaser teaser-small',
        'TagKicker': 'h2',
        'TagHeadline': 'h3'
    }
};

var getContent = function (cat, nid) {
    var c = '', n = '';
    var view;

    if (cat) c = '/' + cat;

    if (nid && cat) n = '/' + nid;

    $.ajax({
        type: 'GET',
        url: 'import.php',
        data: {'cat': c, 'node': n},
        contentType: 'application/json',
        success: function (data, status) {
            $.each(data['nodes'], function (i, node) {
                if (i == 0)
                    render(node.node, 'teaser', teaserConf.teaserBig);
                else
                    render(node.node, 'teaser', teaserConf.teaserSmall);
            });
        }
    })
};


var render = function (obj, view, conf) {
    if (view == 'teaser') renderTeaser(obj, conf);
}

var renderTeaser = function (obj, conf) {
    var view;
    view = '<div class="' + conf.classes + '">' +
        '<div class="teaser-image">' +
        '<div class="category">' +
        '</div>' +
        '<img src="' + obj.field_media_image + '" />' +
        '</div>' +
        '<div class="teaser-content">' +
        '<' + conf.TagKicker + ' class="kicker">' + obj.field_kicker + '</' + conf.TagKicker + '>' +
        '<' + conf.TagHeadline + ' class="headline">' + obj.field_kicker + '</' + conf.TagHeadline + '>' +
        '</div>' +
        '</div>';

    $('.content-wrapper-inner').append(view);
}


window.addEventListener('orientationchange', function () {
    globalData.updateDimensions();
});


$(document).ready(function () {
    var menu = $('#menu');

    getContent();

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

    // Prevent links to be opened in mobile safari.
    $('a').click(function () {
        if (globalData.isStandalone) {
            event.preventDefault();
            window.location = $(this).attr('href');
        }
    });
});