<?php
include 'config.php';

// Route it up!

switch ($request_uri) {
    // Home page
    case FOLDERPATH.'/':
        require 'home.php';
        break;
    // About page
    case FOLDERPATH.'/user':
        require 'user.php';
        break;
    case FOLDERPATH.'/registration':
        require 'new-user.php';
        break;
    case FOLDERPATH.'/login':
        require 'login.php';
        break;
    // Everything else
    default:
        header('HTTP/1.0 404 Not Found');
       require 'error.php';
        break;
}
?>