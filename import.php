<?php header('content-type: application/json; charset=utf-8');

//@todo: security issues to be solved.
$category = $_GET['cat'];
$nid = $_GET['n'];

$url = 'http://goc:goc_admin@dev.gamesoncampus.de/export' . $category . $nid;

$json = file_get_contents($url);

echo $json;