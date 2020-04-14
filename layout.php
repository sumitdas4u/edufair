<!-- begin:: Page -->
<?php
if (isset($_GET['page'])) {
    $page=$_GET['page'];
}
else{
    $page='';
}
?>

<?php include_once('partials/_header/base-mobile.php'); ?>
<!--[html-partial:include:{"file":"partials/_header/base-mobile.html"}]/-->
<div class="kt-grid kt-grid--hor kt-grid--root">
    <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page">
        <?php //include_once('partials/_aside/base.php'); ?>
        <!--[html-partial:include:{"file":"partials/_aside/base.html"}]/-->
        <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">
            <?php  include_once('partials/_header/base.php'); ?>
            <!--[html-partial:include:{"file":"partials/_header/base.html"}]/-->

<?php
if(strpos($page,'pavilion'))
{
?>
            <div class="  " id="kt_content">
                <?php
}
else
    {

    ?>
            <div class="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">
            <?php
    }
?>



                    <!--[html-partial:include:{"file":"partials/_subheader/subheader-v1.html"}]/-->

                    <?php

                    $base_content_url=' ';
                    switch ($user_logged_in->user_role) {

                        case 1:
                            $base_content_url = 'pages/institute/institute_dashboard.php';
                            break;

                        case 2:
                            $base_content_url = 'partials/_content/admin_base.php';
                            break;

                        default:
                            $base_content_url = 'partials/_content/base.php';
                            break;
                    }



                    $page ? include_once('pages/'.$page.'.php') : include_once($base_content_url);?>
                    <!--[html-partial:include:{"file":"partials/_content/base.html"}]/-->
                </div>
                <?php include_once('partials/_footer/base.php'); ?>
                <!--[html-partial:include:{"file":"partials/_footer/base.html"}]/-->
            </div>
        </div>
    </div>

    <!-- end:: Page -->
    <?php include_once('partials/_quick-panel.php'); ?>
    <!--[html-partial:include:{"file":"partials/_quick-panel.html"}]/-->
    <?php include_once('partials/_scrolltop.php'); ?>
    <?php  include_once('partials/_topbar/dropdown/advance-search-modal.php'); ?>

    <!--[html-partial:include:{"file":"partials/_scrolltop.html"}]/-->

    <!--[html-partial:include:{"file":"partials/_toolbar.html"}]/-->

    <!--[html-partial:include:{"file":"partials/_demo-panel.html"}]/-->

    <!--[html-partial:include:{"file":"partials/_chat.html"}]/-->