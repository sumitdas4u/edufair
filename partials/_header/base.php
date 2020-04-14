
<!-- begin:: Header -->
<div id="kt_header" class="kt-header kt-grid__item  kt-header--fixed ">

<?php

switch ($user_logged_in->user_role) {
    // Home page
    case 1:
        require_once 'partials/_header/_institute_menu.php';
        break;
    // About page
    case  2:
        require_once 'partials/_header/_admin_menu.php';
        break;

    default:
        require_once 'partials/_header/_menu.php';
        break;
}

 ?>
	<!--[html-partial:include:{"file":"partials/_header/_menu.html"}]/-->

    <?php

    switch ($user_logged_in->user_role) {
        // Home page
        case 1:
            require_once 'partials/_header/topbar/_institute_base.php';
            break;
        // About page
        case  2:
            require_once 'partials/_header/topbar/_admin_base.php';
            break;

        default:
            require_once 'partials/_header/topbar/_base.php';
            break;
    }

    ?>

	<!--[html-partial:include:{"file":"partials/_header/topbar/_base.html"}]/-->
</div>

<!-- end:: Header -->