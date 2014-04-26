<?php header('content-type: application/json; charset=utf-8');

//@todo: security issues to be solved.
$host = $_SERVER['HTTP_HOST'];

// @todo: Remove due this only for local development.
if ($host === 'phone.dev.gamesoncampus.de' || $host === 'tablet.dev.gamesoncampus.de') {
  $host = 'goc:goc_admin@dev.gamesoncampus.de';
}
elseif ($host === 'tablet.dev.gamesoncampus.de') {
  $host = 'goc:goc_admin@dev.gamesoncampus.de';
}
else {
  $host = 'goc.local';
}

// Get nodes by term.
if (isset($_GET['tid'])) {
  $tid = strval(abs(intval($_GET['tid'])));
  if (!$tid) {
    $tid = '';
  }
  $url = 'http://' . $host . '/export/nodes/' . $tid . '?' . rand();
}
// Get single node.
if (isset($_GET['nid'])) {
  $nid = strval(intval($_GET['nid']));
  $url = 'http://' . $host . '/node/' . $nid . '/export?' . rand();
}

// Get Menu terms.
if (isset($_GET['get_menu'])) {
  $url = 'http://' . $host . '/export/menu';
}

$json = file_get_contents($url);

echo $json;