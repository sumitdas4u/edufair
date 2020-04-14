
<!--begin: User Bar -->
<div class="kt-header__topbar-item kt-header__topbar-item--user">
    <div class="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="0px,0px">
        <div class="kt-header__topbar-user">
            <span class="kt-header__topbar-welcome kt-hidden-mobile">Hi,</span>
            <span class="kt-header__topbar-username kt-hidden-mobile"><?php echo $user_logged_in->name; ?></span>
            <?php if( isset($user_logged_in->user_info->profile_image)){?>
                <img class="kt-hidden" alt="Pic" src="<?php echo $user_logged_in->user_info->profile_image; ?>" />
            <?php } ?>
            <!--use below badge element instead the user avatar to display username's first letter(remove kt-hidden class to display it) -->
            <span class="kt-badge kt-badge--username kt-badge--unified-success kt-badge--lg kt-badge--rounded kt-badge--bold"><?php echo  substr($user_logged_in->name, 0, 1); ?></span>
        </div>
    </div>
    <div class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl">
        <?php  include_once('partials/_topbar/dropdown/user.php'); ?>
        <!--[html-partial:include:{"file":"partials/_topbar/dropdown/user.html"}]/-->
    </div>
</div>

<!--end: User Bar -->