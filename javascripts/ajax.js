/**
 * Get menu tree from drupal export.
 */
$.ajax({
    type: 'GET',
    url: 'import.php',
    data: { get_menu: true },
    contentType: 'application/json',
    success: function (data, status) {
        var children = [], tree = [];
        $.each(data['nodes'], function (i, node) {
            if (node.node.ptid == 0) {
                node.node.children = [];
                tree.push(node.node);
            }
            else {
                children.push(node.node);
            }
        });

        children.forEach(function (child) {
            tree.forEach(function (parent) {
                if (child.ptid == parent.tid) {
                    parent.children.push(child);
                }
            });
        });
        render(tree, 'menu');
    }
});

/**
 * Get nodes by term id.
 * @param tid
 */
var getNodes = function (tid) {
    $('.loader').fadeIn('slow');

    if (!tid) {
        tid = '';
    }

    $.ajax({
        cache: false, // @todo: remove, debugging only.
        type: 'GET',
        url: 'import.php',
        data: { tid: tid },
        contentType: 'application/json',
        success: function (data, status) {
            // Define medium-Teaser
            $('.content-wrapper-inner').empty();
            var tm = [5, 6, 7, 8, 13, 14, 15, 16];
            console.log(data);
            $.each(data, function (i, node) {
                if (i == 0)
                    render(node, 'teaser', teaserConf.teaserBig);
                else if (tm.indexOf(i) >= 0)
                    render(node, 'teaser', teaserConf.teaserMedium);
                else
                    render(node, 'teaser', teaserConf.teaserSmall);
            });
            $('.loader').fadeOut('slow');
        }
    });
};

/**
 * Get single node.
 * @param nid
 */
var getNode = function (nid) {
    $('.loader').fadeIn('slow');

    $.ajax({
        cache: false, // @todo: remove, debugging only.
        type: 'GET',
        url: 'import.php',
        data: {nid: nid},
        contentType: 'application/json',
        success: function (data, status) {
            // Define medium-Teaser
            $('.content-wrapper-inner').empty();
            render(data, 'full');
            $('.loader').fadeOut('slow');
        }
    })
}