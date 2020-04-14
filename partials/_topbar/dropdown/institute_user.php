
<!--begin: Head -->
<div class="kt-user-card kt-user-card--skin-dark kt-notification-item-padding-x" style="background-image: url(assets/media/misc/bg-1.jpg)">
    <div class="kt-user-card__avatar">
        <?php if( isset($user_logged_in->user_info->profile_image)){?>
            <img class="" alt="Pic" src="<?php echo $user_logged_in->user_info->profile_image; ?>" />
        <?php } else {?>
            <!--use below badge element instead the user avatar to display username's first letter(remove kt-hidden class to display it) -->
            <span class="kt-badge kt-badge--lg kt-badge--rounded kt-badge--bold kt-font-success"><?php echo  substr($user_logged_in->name, 0, 1); ?></span>
        <?php } ?>
    </div>
    <div class="kt-user-card__name">
        <?php echo $user_logged_in->name; ?>
    </div>
    <div class="kt-user-card__badge">
        <span class="btn btn-success btn-sm btn-bold btn-font-md">23 messages</span>
    </div>
</div>
<!--end: Head -->

<!--begin: Navigation -->
<div class="kt-notification">
	<a href="custom/apps/user/profile-1/personal-information.html" class="kt-notification__item">
		<div class="kt-notification__item-icon">
			<i class="flaticon2-calendar-3 kt-font-success"></i>
		</div>
		<div class="kt-notification__item-details">
			<div class="kt-notification__item-title kt-font-bold">
				My Profile
			</div>
			<div class="kt-notification__item-time">
				Account settings and more
			</div>
		</div>
	</a>

	<a href="custom/apps/user/profile-1/overview.html" class="kt-notification__item">
		<div class="kt-notification__item-icon">
			<i class="flaticon2-cardiogram kt-font-warning"></i>
		</div>
		<div class="kt-notification__item-details">
			<div class="kt-notification__item-title kt-font-bold">
				Dashboard
			</div>
			<div class="kt-notification__item-time">
				Reports & performance
			</div>
		</div>
	</a>
	<div class="kt-notification__custom kt-space-between">
		<a href="logout.php"  class="btn btn-label btn-label-brand btn-sm btn-bold">Sign Out</a>
		<!-- <a href="custom/user/login-v2.html" target="_blank" class="btn btn-clean btn-sm btn-bold">Upgrade Plan</a> -->
	</div>
</div>

<!--end: Navigation -->