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
        renderMenu(tree);
    }
});

/**
 * Get nodes by term id.
 * @param tid
 */
var getNodes = function (tid) {
    $('.loader').fadeIn('slow');

    if (!tid) tid = '';

    $.ajax({
        cache: false, // @todo: remove, debugging only.
        type: 'GET',
        url: 'import.php',
        data: { tid: tid },
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
        url: 'import.php',
        data: {nid: nid},
        contentType: 'application/json',
        success: function (data, status) {
            render(data, 'full');
        }
    })
}