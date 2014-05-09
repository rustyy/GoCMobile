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
    menuCSSqueues: function (toggle) {
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

    menuToggle: function (toggle, el) {
        var queue;
        var timeout = 1;
        var toggle;

        if (menu.hasClass('menu-visible')) {
            toggle = 'hide';
        }
        else {
            toggle = 'show';
            menu.addClass('menu-visible');
        }

        // Clone queue.
        queue = this.menuCSSqueues(toggle).concat([]);

        // Handle the css styling queue.
        (function loop() {
            setTimeout(function () {
                if (queue.length > 0) {
                    menu.css(queue.pop());
                    loop();
                }
                // Wait for the animation to be finished.
                // Afterwards hide menu again.
                if (queue.length == 0 && toggle == 'hide')
                    setTimeout(function () {
                        menu.css({'display': 'none'})
                        menu.removeClass('menu-visible');
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

var menu = $('#menu');
var logo = $('#logo');

var documentIsTop = false;
var documentIsBottom = false;
var startY;
var endY;

//var t = $('#content-wrapper').css('top');

/******************************************************************************************************************
 * Functions
 */

var render = function (data, view) {
    // Define medium-Teaser
    var tm = [5, 6, 7, 8, 13, 14, 15, 16];

    $('#prev-article').remove();
    $('#next-article').remove();
    $('.content-wrapper-inner').empty();

    if (view === 'full') {
        renderFull(data);
    }

    if (view === 'teaser') {
        $.each(data, function (i, node) {
            if (i == 0)
                renderTeaser(node, teaserConf.teaserBig);
            else if (tm.indexOf(i) >= 0)
                renderTeaser(node, teaserConf.teaserMedium);
            else
                renderTeaser(node, teaserConf.teaserSmall);
        });
    }

    // Hide loader.
    $('.loader').fadeOut('slow');

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
        '<div class="category">' + obj.term + '</div>' +
        obj.image +
        '</div>' +
        '<div class="teaser-content">' +
        '<' + conf.TagKicker + ' class="kicker">' + obj.kicker + '</' + conf.TagKicker + '>' +
        '<' + conf.TagHeadline + ' class="headline">' + obj.headline + '</' + conf.TagHeadline + '>' +
        '</div>' +
        '</div>';

    $('.content-wrapper-inner').append(view);
}

var renderFull = function (obj) {
    var view,
        prevNid,
        nextNid;

    console.log(obj.images);

    prevNid = (obj.prev_nid) ? ' data-prev-nid="' + parseInt(obj.prev_nid) + '" ' : '';
    nextNid = (obj.next_nid) ? ' data-next-nid="' + parseInt(obj.next_nid) + '" ' : '';

    view = '<div class="article"' + prevNid + nextNid + '>' +
        '<div class="category">[KATEGORIE]</div>' +
        '<div class="article-images">';

    obj.images.forEach(function (v, i) {
        //@todo: fallback if no image is present.
        view += '<div class="image">' + v.image +
            '<div>' + (v.caption || '') + '</div>' +
            '<div>' + ('Foto: ' + v.copyright || '') + '</div>' +
            '</div>';
    });

    view += '</div>';

    view += '<div class="article-content">' +
        '<h1 class="kicker">' + obj.kicker + '</h1>' +
        '<h2 class="headline">' + obj.headline + '</h2>' +
        obj.body +
        '</div>' +
        '</div>';

    $('.content-wrapper-inner').append(view);
    if (obj.prev_nid)
        $('body').append('<div id="prev-article"><div class="overlay"></div><div class="inner">PREV</div></div>');
    if (obj.next_nid)
        $('body').append('<div id="next-article"><div class="inner">NEXT</div></div>');

};

/******************************************************************************************************************
 * Event listener
 */

/**
 * Orientationchange
 */
window.addEventListener('orientationchange', function () {
    globalData.updateDimensions();
});

$(document).on('scroll', function (e) {
    if (!menu.hasClass('menu-visible'))
        globalData.updateDimensions();
});

$(document).on('click', '.teaser', function () {
    var n = $(this).attr('data-n');
    getNode(n);
});

$(document).on('click', '#menu span', function () {
    getNodes($(this).attr('data-c'));
    globalData.menuToggle();
});

logo.on('click', function () {
    globalData.menuToggle();
});


$(document).on('touchstart', function (e) {
    documentIsTop = ($(document).scrollTop() == 0);
    documentIsBottom = (($(document).scrollTop() + globalData.wHeight) == $(document).height());
    startY = e.originalEvent.touches[0].clientY;
});

$(document).on('touchmove', function (e) {

    var distance = startY - endY;
    endY = e.originalEvent.touches[0].clientY;


    if ($(document).scrollTop() == 0 && Math.abs(distance) <= 50) {
        $('#next-article').css({
            '-webkit-transform': 'translateY(' + -distance + 'px)'
        });
    }

    if (($(document).scrollTop() + globalData.wHeight) >= $(document).height() && Math.abs(distance) <= 50) {
        $('#prev-article .overlay').css({
            '-webkit-transform': 'translateY(' + (-distance ) + 'px) translateZ(0.1px)'
        });
    }

    if (menu.hasClass('menu-visible'))
        e.preventDefault();
});


$(document).on('touchend', function (e) {
    var nidNext = $('.article').attr('data-next-nid');
    var nidPrev = $('.article').attr('data-prev-nid');
    var distance = startY - endY;

    if (documentIsBottom && nidPrev && distance >= 50) {
        getNode(nidPrev);
    }
    if (e.originalEvent.pageY == 0) {
        // @todo: wait for ajax requests to be finished
        if (documentIsTop && nidNext && distance <= -50) {
            getNode(nidNext);
        }
    }
    $('#next-article').attr('style', '');
    $('#prev-article .overlay').attr('style', '');
});


/******************************************************************************************************************
 * RUN
 */

globalData.updateDimensions();
//    getNodes();
getNode(22);

