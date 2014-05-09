var baseUrl = 'http://goc:goc_admin@dev.gamesoncampus.de';

/**
 * Get menu tree from drupal export.
 */
$.ajax({
    type: 'GET',
    url: baseUrl + '/export/menu',
    jsonp: 'export_menu',
    dataType: 'jsonp',
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
        renderMenu(tree);
    }
});

/**
 * Get nodes by term id.
 * @param tid
 */
var getNodes = function (tid) {
    $('.loader').fadeIn('slow');

    if (!tid) tid = 'all';

    $.ajax({
        cache: false, // @todo: remove, debugging only.
        type: 'GET',
        jsonp: 'export_nodes_callback',
        url: baseUrl + '/export_nodes/' + tid,
        dataType: 'jsonp',
        contentType: 'application/json',
        success: function (data, status) {
            render(data, 'teaser');
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
        jsonp: 'export_node_callback',
        dataType: 'jsonp',
        url: baseUrl + '/node/' + nid + '/export',
        contentType: 'application/json',
        success: function (data, status) {
            render(data, 'full');
        }
    })
}