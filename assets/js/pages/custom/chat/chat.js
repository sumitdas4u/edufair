"use strict";

var userSessionData = JSON.parse(sessionStorage.sessionUserData);

//load Chat threads
function loadChatThreads()
{
   // alert(obj.message);
    //click funtion
    $('body').on('click','.kt-widget__item',function(){
        $('.kt-portlet__foot').css("visibility","visible");
        $('.kt-widget__item').removeClass('active');
        $(this).addClass('active');
        $(this).children(".kt-widget__action").children(".kt-badge").remove();
        $(".kt-chat__title").html($(this).attr("friend_name"));
        $(".kt-chat__status").html(' Last seen '+moment($(this).attr("friend_last_update")).fromNow());
        $(".kt-chat__title").attr("thread_id",$(this).attr("chat_thread_id"));
        $(".kt-chat__title").attr("to_user",$(this).attr("friend_profile_id"));
        $(".kt-chat__title").attr("friend_profile_pic",$(this).attr("friend_profile_pic"));
        $(".kt-chat__title").attr("friend_name",$(this).attr("friend_name"));
        $(".kt-chat__messages").empty();

        loadChatHistory($(this).attr("chat_thread_id"));

        //update seen message
        $.ajax({
            url: apiConfig.chatUnreadSeen,
            type: "POST",
            data: {'chat_thread_id':$(this).attr("chat_thread_id")
            },
            headers: {
                Authorization: 'Bearer ' + userSessionData.data.token.token   //If your header name has spaces or any other char not appropriate
            },
            success: function(data, textStatus, jqXHR)
            {
                console.log(data + 'thread seen');
            },
            error: function (request, textStatus, errorThrown) {
                console.log(request + + 'thread error');
            }
        });

    });
    AjaxChatThreads();
//TODO: 2nd message is show the update
//new msg when 1st converstaion change user to user . element is  removed and added new
//.where('chat_uuid', '==', chat_data.chat_uuid)
    db.collection('chat').where('user_id', '==', userSessionData.data.id)
        .orderBy('time')
        .onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
                if (change.type === "added") {
                    console.log("New : ", change.doc.data());
                }
                if (change.type === "modified") {
                    console.log("Modified : ", change.doc.data());
                    AjaxChatThreads();
                }
                if (change.type === "removed") {
                    console.log("Removed    : ", change.doc.data());

                }
            });
        });





}

function AjaxChatThreads(){
    $("#chatlistholder").empty();
    $.ajax({
        url: apiConfig.chatUserThread,
        type: "GET",
        headers: {
            Authorization: 'Bearer ' + userSessionData.data.token.token   //If your header name has spaces or any other char not appropriate
        }
    }).done(function (repos) {
            console.log(repos);

        $.each(repos.data, function (index, repo) {
            var unreadNotification =false;
            var onOfUnreadNotification =0;
            if(repo.chat_unread){
                $.each(repo.chat_unread, function (index, msg) {

                    if(msg.user_id===userSessionData.data.id){
                        unreadNotification =true;
                        onOfUnreadNotification = msg.no_of_message
                        console.log(unreadNotification);
                    }
                });
            }


            $("#chatlistholder").append(
                '<div class="kt-widget__items ">' +
                '<div class="kt-widget__item" friend_name="' + repo.friend_name + '" ' +
                ' friend_profile_pic="' +  repo.friend_profile_pic + '"'+
                ' friend_last_update="' + repo.friend_last_update + '"'+
                ' chat_thread_id="' + repo.chat_thread_id + '"'+
                ' friend_profile_id="' + repo.friend_profile_id + '"'+
                '>' +
                '<span class="kt-media kt-media--circle">' +
                '<img src="' + repo.friend_profile_pic + '" alt="image">' +
                '</span>' +
                '<div class="kt-widget__info">' +
                '<div class="kt-widget__section">' +
                '<a href="#" class="kt-widget__username">' + repo.friend_name + '</a>' +

                '</div>' +
                '<span class="kt-widget__desc">' +
                repo.chat_last_message +
                '</span>' +
                '</div>' +
                '<div class="kt-widget__action">' +
                '<span class="kt-widget__date">' + moment(repo.updated_at).fromNow() + '</span>' +
                (onOfUnreadNotification ?
                    '<span class="kt-badge kt-badge--success kt-font-bold">' + onOfUnreadNotification + '</span>' : '' ) +
                '</div>' +
                '</div>' +
                '</div>'
            );

        });
    });
}
// Class definition
var KTAppChat = function () {
	var chatAsideEl;
	var chatContentEl;

	// Private functions
	var initAside = function () {
		// Mobile offcanvas for mobile mode
		var offcanvas = new KTOffcanvas(chatAsideEl, {
            overlay: true,
            baseClass: 'kt-app__aside',
            closeBy: 'kt_chat_aside_close',
            toggleBy: 'kt_chat_aside_mobile_toggle'
        });

		// User listing
		var userListEl = KTUtil.find(chatAsideEl, '.kt-scroll');
		if (!userListEl) {
			return;
		}

		// Initialize perfect scrollbar(see:  https://github.com/utatti/perfect-scrollbar)
		KTUtil.scrollInit(userListEl, {
			mobileNativeScroll: true,  // enable native scroll for mobile
			desktopNativeScroll: false, // disable native scroll and use custom scroll for desktop
			resetHeightOnDestroy: true,  // reset css height on scroll feature destroyed
			handleWindowResize: true, // recalculate hight on window resize
			rememberPosition: true, // remember scroll position in cookie
			height: function() {  // calculate height
				var height;
				var portletBodyEl = KTUtil.find(chatAsideEl, '.kt-portlet > .kt-portlet__body');
				var widgetEl = KTUtil.find(chatAsideEl, '.kt-widget.kt-widget--users');
				var searchbarEl = KTUtil.find(chatAsideEl, '.kt-searchbar');

				if (KTUtil.isInResponsiveRange('desktop')) {
					height = KTLayout.getContentHeight();
				} else {
					height = KTUtil.getViewPort().height;
				}

				if (chatAsideEl) {
					height = height - parseInt(KTUtil.css(chatAsideEl, 'margin-top')) - parseInt(KTUtil.css(chatAsideEl, 'margin-bottom'));
					height = height - parseInt(KTUtil.css(chatAsideEl, 'padding-top')) - parseInt(KTUtil.css(chatAsideEl, 'padding-bottom'));
				}

				if (widgetEl) {
					height = height - parseInt(KTUtil.css(widgetEl, 'margin-top')) - parseInt(KTUtil.css(widgetEl, 'margin-bottom'));
					height = height - parseInt(KTUtil.css(widgetEl, 'padding-top')) - parseInt(KTUtil.css(widgetEl, 'padding-bottom'));
				}

				if (portletBodyEl) {
					height = height - parseInt(KTUtil.css(portletBodyEl, 'margin-top')) - parseInt(KTUtil.css(portletBodyEl, 'margin-bottom'));
					height = height - parseInt(KTUtil.css(portletBodyEl, 'padding-top')) - parseInt(KTUtil.css(portletBodyEl, 'padding-bottom'));
				}

				if (searchbarEl) {
					height = height - parseInt(KTUtil.css(searchbarEl, 'height'));
					height = height - parseInt(KTUtil.css(searchbarEl, 'margin-top')) - parseInt(KTUtil.css(searchbarEl, 'margin-bottom'));
				}

				// remove additional space
				height = height - 5;

				return height;
			}
		});
	}

	return {
		// public functions
		init: function() {
			// elements
			chatAsideEl = KTUtil.getByID('kt_chat_aside');
			// init aside and user list
			initAside();
			// init inline chat example
			KTChat.setup(KTUtil.getByID('kt_chat_content'));


		}
	};
}();
var KTChat = function () {
    var initChat = function (parentEl) {

        var messageListEl = KTUtil.find(parentEl, '.kt-scroll');
        if (!messageListEl) {
            return;
        }
        // initialize perfect scrollbar(see:  https://github.com/utatti/perfect-scrollbar)
        KTUtil.scrollInit(messageListEl, {


            windowScroll: false, // allow browser scroll when the scroll reaches the end of the side
            mobileNativeScroll: true,  // enable native scroll for mobile
            desktopNativeScroll: false, // disable native scroll and use custom scroll for desktop
            resetHeightOnDestroy: true,  // reset css height on scroll feature destroyed
            handleWindowResize: true, // recalculate hight on window resize
            rememberPosition: true, // remember scroll position in cookie
            height: function() {  // calculate height
                var height;

                // Mobile mode
                if (KTUtil.isInResponsiveRange('tablet-and-mobile')) {
                    return KTUtil.hasAttr(messageListEl, 'data-mobile-height') ? parseInt(KTUtil.attr(messageListEl, 'data-mobile-height')) : 300;
                }

                // Desktop mode
                if (KTUtil.isInResponsiveRange('desktop') && KTUtil.hasAttr(messageListEl, 'data-height')) {
                    return parseInt(KTUtil.attr(messageListEl, 'data-height'));
                }

                var chatEl = KTUtil.find(parentEl, '.kt-chat');
                var portletHeadEl = KTUtil.find(parentEl, '.kt-portlet > .kt-portlet__head');
                var portletBodyEl = KTUtil.find(parentEl, '.kt-portlet > .kt-portlet__body');
                var portletFootEl = KTUtil.find(parentEl, '.kt-portlet > .kt-portlet__foot');

                if (KTUtil.isInResponsiveRange('desktop')) {
                    height = KTLayout.getContentHeight();
                } else {
                    height = KTUtil.getViewPort().height;
                }

                if (chatEl) {
                    height = height - parseInt(KTUtil.css(chatEl, 'margin-top')) - parseInt(KTUtil.css(chatEl, 'margin-bottom'));
                    height = height - parseInt(KTUtil.css(chatEl, 'padding-top')) - parseInt(KTUtil.css(chatEl, 'padding-bottom'));
                }

                if (portletHeadEl) {
                    height = height - parseInt(KTUtil.css(portletHeadEl, 'height'));
                    height = height - parseInt(KTUtil.css(portletHeadEl, 'margin-top')) - parseInt(KTUtil.css(portletHeadEl, 'margin-bottom'));
                }

                if (portletBodyEl) {
                    height = height - parseInt(KTUtil.css(portletBodyEl, 'margin-top')) - parseInt(KTUtil.css(portletBodyEl, 'margin-bottom'));
                    height = height - parseInt(KTUtil.css(portletBodyEl, 'padding-top')) - parseInt(KTUtil.css(portletBodyEl, 'padding-bottom'));
                }

                if (portletFootEl) {
                    height = height - parseInt(KTUtil.css(portletFootEl, 'height'));
                    height = height - parseInt(KTUtil.css(portletFootEl, 'margin-top')) - parseInt(KTUtil.css(portletFootEl, 'margin-bottom'));
                }

                // remove additional space
                height = height - 5;

                return height;
            }
        });


        var scrollEl = KTUtil.find(parentEl, '.kt-scroll');
        var messagesEl = KTUtil.find(parentEl, '.kt-chat__messages');
        var textarea = KTUtil.find(parentEl, '.kt-chat__input textarea');

        // messaging
        var handleMessaging = function() {
            var chatThreadId=$(".kt-chat__title").attr("thread_id");
            var to_user=$(".kt-chat__title").attr("to_user");
            var scrollEl = KTUtil.find(parentEl, '.kt-scroll');
            var messagesEl = KTUtil.find(parentEl, '.kt-chat__messages');
            var textarea = KTUtil.find(parentEl, '.kt-chat__input textarea');

            if(!chatThreadId){

                return;
            }

            if (textarea.value.length === 0 ) {
                return;
            }



            var message =textarea.value;
            textarea.value = '';
            //   alert(message);
            if(message !== ""){



               /* db.collection('chat').add({
                    thread_id:chatThreadId,
                    to_user : to_user,
                    message : message,
                    time : new Date()
                })
                    .then(function(docRef) {

                    })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                    });*/


                db.collection("chat").where("thread_id", "==", chatThreadId)
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                 //           console.log(doc.id, " => ", doc.data());
                            // Build doc ref from doc.id
                            db.collection("chat").doc(doc.id).update({
                                user_id : +to_user,
                                message : message,
                                time : new Date()
                            });
                        });
                    })



                db.collection('chat').doc('privateChat')
                    .collection(chatThreadId).add({
                    message : message,
                    to_user : to_user,
                    from_user : userSessionData.data.id,
                    time : new Date(),
                })
                    .then(function(docRef) {
                        $(".message-input").val("");
                      //  console.log("Document written with ID: ", docRef.id);
                    })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                    });


                $.ajax({
                    url: apiConfig.chatSetUnread,
                    type: "POST",
                    data: {'chat_thread_id':chatThreadId,
                        'to_user': to_user,
                        'from_user': userSessionData.data.id
                    },
                    headers: {
                        Authorization: 'Bearer ' + userSessionData.data.token.token   //If your header name has spaces or any other char not appropriate
                    },
                    success: function(data, textStatus, jqXHR)
                    {
                        console.log(data);
                    },
                    error: function (request, textStatus, errorThrown) {
                        console.log(request);
                    }
                });


            }

        }





        // attach events
        KTUtil.on(parentEl, '.kt-chat__input textarea', 'keydown', function(e) {
            if (e.keyCode == 13) {
                handleMessaging();
                e.preventDefault();

                return false;
            }
        });

        KTUtil.on(parentEl, '.kt-chat__input .kt-chat__reply', 'click', function(e) {
            handleMessaging();
        });
    }

    return {
        // public functions
        init: function() {
            // init modal chat example
          //  initChat( KTUtil.getByID('kt_chat_modal2ASDAS'));


        },

        setup: function(element) {
            initChat(element);
        }
    };
}();




function loadChatHistory(unique_chat_id){











    var kt_chat_content = KTUtil.getByID('kt_chat_content');
    var scrollEl = KTUtil.find(kt_chat_content, '.kt-scroll');
    var messagesEl = KTUtil.find(kt_chat_content, '.kt-chat__messages');
    var node = document.createElement("DIV");
    KTUtil.addClass(node, '');


    var newMessage = '';

    db.collection('chat').doc('privateChat')
        .collection(unique_chat_id)
        .orderBy('time')
        .onSnapshot(function(snapshot) {

            snapshot.docChanges().forEach( function(change) {
                if (change.type === "added") {

                    //   console.log(change.doc.data());

                    if (change.doc.data().from_user == userSessionData.data.id) {


                        newMessage +=
                            '<div class="kt-chat__message kt-chat__message--brand kt-chat__message--right">'+
                            '<div class="kt-chat__user">' +
                            '<span class="kt-chat__datetime">'+moment(change.doc.data().time.toMillis()).fromNow() +'</span>' +
                            '<a href="#" class="kt-chat__username">'+userSessionData.data.name+'</span></a>' +
                            '<span class="kt-media kt-media--circle kt-media--sm">' +
                            '<img src="'+userSessionData.data.user_info.profile_image+'" alt="image">'  +
                            '</span>' +
                            '</div>' +
                            '<div class="kt-chat__text kt-bg-light-brand">' +
                            change.doc.data().message+
                            '</div></div>   ';


                    }else{



                         newMessage +=
                             '<div class="kt-chat__message">'+
                            '<div class="kt-chat__user">' +
                            '<span class="kt-media kt-media--circle kt-media--sm">' +
                            '<img src="'+$(".kt-chat__title").attr("friend_profile_pic")+'" alt="image">'  +
                            '</span>' +
                            '<a href="#" class="kt-chat__username">'+ $(".kt-chat__title").attr("friend_name")+'</span></a>' +
                            '<span class="kt-chat__datetime">'+moment(change.doc.data().time.toMillis()).fromNow() +'</span>' +
                            '</div>' +
                            '<div class="kt-chat__text kt-bg-light-success">' +
                             change.doc.data().message +
                            '</div></div>';


                    }



                }
                if (change.type === "modified") {

                }
                if (change.type === "removed") {

                }

            });




//todo:chat new last messge send not return
            //  if (html != newMessage) {
            KTUtil.setHTML(node, newMessage);
            messagesEl.appendChild(node);

            scrollEl.scrollTop = parseInt(KTUtil.css(messagesEl, 'height'));

            var ps;
            if (ps = KTUtil.data(scrollEl).get('ps')) {
                ps.update();
            }

        });

}

// webpack support
if (typeof module !== 'undefined') {
    module.exports = KTChat;
}
KTUtil.ready(function() {
 KTChat.init();
 KTAppChat.init();
 loadChatThreads();

});
