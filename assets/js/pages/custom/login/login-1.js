"use strict";

// Class Definition
var KTLoginV1 = function () {
	var login = $('#kt_login');

	var showErrorMsg = function(form, type, msg) {
        var alert = $('<div class="alert alert-bold alert-solid-' + type + ' alert-dismissible" role="alert">\
			<div class="alert-text">'+msg+'</div>\
			<div class="alert-close">\
                <i class="flaticon2-cross kt-icon-sm" data-dismiss="alert"></i>\
            </div>\
		</div>');

        form.find('.alert').remove();
        alert.prependTo(form);
        KTUtil.animateClass(alert[0], 'fadeIn animated');
    }

	// Private Functions
	var handleSignInFormSubmit = function () {
		$('#kt_login_signin_submit').click(function (e) {
			e.preventDefault();

			var btn = $(this);
			var form = $('#kt_login_form');

			form.validate({
				rules: {
					email: {
						required: true,
						email:true
					},
					password: {
						required: true
					}
				}
			});

			if (!form.valid()) {
				return;
			}

			KTApp.progress(btn[0]);

			setTimeout(function () {
				KTApp.unprogress(btn[0]);
			}, 2000);
 
		 
			// ajax form submit:  http://jquery.malsup.com/form/
			form.ajaxSubmit({
				url: apiConfig.loginApi,
				type:"POST",
				data: form.serialize(),
				error: function (response){			 
					showErrorMsg(form, 'danger', 'Incorrect username or password. Please try again.');
					KTApp.unprogress(btn[0]);
				},
				success: function (response, status, xhr, $form) {
				 
						KTApp.unprogress(btn[0]);
						 console.log(response);

                    	sessionStorage.setItem('sessionUserData', JSON.stringify(response));

							$.ajax({
							url: "set_auth.php",
							type: "POST",
							data: response,
							success: function(data, textStatus, jqXHR)
							{
							    var data = jQuery.parseJSON(data);
                        			window.location.replace(data.url);
								return false;
							},
							error: function (request, textStatus, errorThrown) {
								console.log(request);
							}
						});
				 
				}
			});
		});
	}

	// Public Functions
	return {
		// public functions
		init: function () {
			handleSignInFormSubmit();
		}
	};
}();

// Class Initialization
jQuery(document).ready(function () {

	KTLoginV1.init();

	var firebaseConfig = {
		apiKey: "AIzaSyAjIMmqZsu3vAsrnjJg68BPWKEUYlvOle4",
		authDomain: "vfair-d6435.firebaseapp.com",
		databaseURL: "https://vfair-d6435.firebaseio.com",
		projectId: "vfair-d6435",
		storageBucket: "vfair-d6435.appspot.com",
		messagingSenderId: "296775515159",
		appId: "1:296775515159:web:83245c34ee189fdebaf052",
		measurementId: "G-52RMTJYSW6"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);

	$('#kt_login_signin_fb').click(function (e) {
		//alert();
		
		fb_sign_in();

	});

});


function setSession(){


}




	
//facebook login logic
function fb_sign_in(){

	var form = $('#kt_login_form');
	var showErrorMsg = function(form, type, msg) {
        var alert = $('<div class="alert alert-bold alert-solid-' + type + ' alert-dismissible" role="alert">\
			<div class="alert-text">'+msg+'</div>\
			<div class="alert-close">\
                <i class="flaticon2-cross kt-icon-sm" data-dismiss="alert"></i>\
            </div>\
		</div>');

        form.find('.alert').remove();
        alert.prependTo(form);
        KTUtil.animateClass(alert[0], 'fadeIn animated');
    }

	var btn = $('#kt_login_signin_fb');
	KTApp.progress(btn);
	setTimeout(function () {
		KTApp.unprogress(btn);
	}, 10000);

	var provider = new firebase.auth.FacebookAuthProvider();
	provider.setCustomParameters({
		'display': 'popup'
		});
	provider.addScope('email');
	firebase.auth().useDeviceLanguage();
	firebase.auth().signInWithPopup(provider).then(function(result) {
	// This gives you a Facebook Access Token. You can use it to access the Facebook API.
	var token = result.credential.accessToken;
	// The signed-in user info.
	var user = result.user;
	//console.log(user);
	$.ajax({
			url: apiConfig.loginApi,
			type: "POST",
			data: {'email':user.email,
				'oauth_provider':'facebook',
				'password':user.uid
			},
			success: function(response, textStatus, jqXHR)
			{
                sessionStorage.setItem('sessionUserData', JSON.stringify(response));
				$.ajax({
					url: "set_auth.php",
					type: "POST",
					data: response,
					success: function(data, textStatus, jqXHR)
					{
						var data = jQuery.parseJSON(data);
						window.location.replace(data.url);
						return false;
					},
					error: function (request, textStatus, errorThrown) {
					showErrorMsg(form, 'danger', 'Facebook login Fail.Try Some other method.');
					KTApp.unprogress(btn);
					}
				});
					
			},
			error: function (errormsg, textStatus, errorThrown) {
				if(errormsg.responseJSON.code==401){
					showErrorMsg(form, 'danger', 'User already registed in some other login method.');
					KTApp.unprogress(btn);
				}
					
					if(errormsg.responseJSON.code==404){

						$.ajax({
								url: apiConfig.userRegister,
								type: "POST",
								data: {'email':user.email,
									'oauth_provider':'facebook',
									'password':user.uid,
									'name':user.displayName,
									'mobile_no':user.phoneNumber
								},
								success: function(response, textStatus, jqXHR)
								{
								
									$.ajax({
											url: apiConfig.loginApi,
											type: "POST",
											data: {'email':user.email,
												'oauth_provider':'facebook',
												'password':user.uid
											},
											success: function(response, textStatus, jqXHR)
											{
											//	console.log(response);
                                                sessionStorage.setItem('sessionUserData', JSON.stringify(response));
												$.ajax({
													url: "set_auth.php",
													type: "POST",
													data: response,
													success: function(data, textStatus, jqXHR)
													{
														var data = jQuery.parseJSON(data);
														window.location.replace(data.url);
														return false;
													},
													error: function (request, textStatus, errorThrown) {
														showErrorMsg(form, 'danger', 'Facebook login failed to start the seasion');
														KTApp.unprogress(btn);
													}
												});

											},
											error: function (request, textStatus, errorThrown) {
												showErrorMsg(form, 'danger', 'Facebook login failed.');
												KTApp.unprogress(btn);
											}
									});
								},
								error: function (error, textStatus, errorThrown) {
									showErrorMsg(form, 'danger', 'Facebook registration failed.');
									KTApp.unprogress(btn);
									
								}
						});
					}
			}
		});

		KTApp.unprogress(btn);
	// ...
	}).catch(function(error) {
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
	// The email of the user's account used.
	var email = error.email;
	// The firebase.auth.AuthCredential type that was used.
	var credential = error.credential;
	// ...
	});
}