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

var render = function (obj, view, conf) {
    if (view == 'teaser') renderTeaser(obj, conf);
    if (view == 'full') renderFull(obj);
    if (view == 'menu') renderMenu(obj);
}

var renderMenu = function (tree) {
    var view;
    view = '<ul>';

    // Render parents.
    tree.forEach(function (o, i) {
        var children = '';
        // Render children.
        if (o.children.length > 0) {
            children += '<ul class="children">';
            o.children.forEach(function (child) {
                children += '<li><span  data-c="' + child.tid + '">' + child.name + '</span></li>';
            });
            children += '</ul>';
        }

        view += '<li><span data-c="' + o.tid + '">' + o.name + '</span>' + children + '</li>'
    });
    view += '</ul>';

    $('#menu').append(view);
};

var renderTeaser = function (obj, conf) {
    var view;
    view = '<div class="' + conf.classes + '" data-c="' + obj.tid + '" data-n="' + obj.nid + '">' +
        '<div class="teaser-image">' +
        '<div class="category">' + obj.term_node_tid + '</div>' +
        '<img src="' + obj.field_media_image + '" />' +
        '</div>' +
        '<div class="teaser-content">' +
        '<' + conf.TagKicker + ' class="kicker">' + obj.field_kicker + '</' + conf.TagKicker + '>' +
        '<' + conf.TagHeadline + ' class="headline">' + obj.field_kicker + '</' + conf.TagHeadline + '>' +
        '</div>' +
        '</div>';

    $('.content-wrapper-inner').append(view);
}

var renderFull = function (obj) {
    var view;
    view = '<div class="article">' +
        '<div class="article-images">' +
        '</div>' +
        '<div class="article-content">' +
        '<h1 class="kicker">' + obj.kicker + '</h1>' +
        '<h2 class="headline">' + obj.headline + '</h2>' +
        obj.body +
        '</div>' +
        '</div>';

    $('.content-wrapper-inner').append(view);
};

window.addEventListener('orientationchange', function () {
    globalData.updateDimensions();
});

$(document).ready(function () {
    var menu = $('#menu');

    getNodes();

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

    $(document).on('click', '.teaser', function () {
        var n = $(this).attr('data-n');
        getNode(n);
    });

    $(document).on('click', '#menu span', function () {
        menu = $('#menu');
        getNodes($(this).attr('data-c'));
        globalData.menuCSStoggle('hide', menu);
    });
});