<?php header('content-type: application/json; charset=utf-8');

//@todo: security issues to be solved.

// Get nodes by arguments.
if (isset($_GET['get_nodes'])) {
  $category = '';
  $nid = '';
  if (isset($_GET['cat'])) {
    $category = $_GET['cat'];
  }

  if (isset($_GET['node'])) {
    $nid = $_GET['node'];
  }

//@todo: remove rand() due needed for debugging purposes only.
  $url = 'http://goc:goc_admin@dev.gamesoncampus.de/export/nodes' . $category . $nid . '?' . rand();
}

// Get Menu terms.
if (isset($_GET['get_menu'])) {
  $url = 'http://goc:goc_admin@dev.gamesoncampus.de/export/menu';
}


$json = file_get_contents($url);

echo $json;