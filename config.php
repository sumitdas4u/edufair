<?php
session_start();
if(isset($_SESSION['user_logged_in'])){
    $user_logged_in = json_decode(unserialize($_SESSION['user_logged_in']));
}

define('FOLDERPATH', '/user/frontent');
$request_uri = explode('?', $_SERVER['REQUEST_URI'], 2);
$request_uri = $request_uri[0];

?>