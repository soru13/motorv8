 
 var send_notification = function() {

    if (window.webkitNotifications && navigator.userAgent.indexOf("Chrome") > -1) {

      console.log("Web Notifications are supported with the WebKit API");

      if (webkitNotifications.checkPermission() == 0) {

        console.log("Web Notifications are allowed");
        var n = webkitNotifications.createNotification('not_used.jpg', 'Notification Title', 'Details on the notification...');
        n.show();

      } else if (webkitNotifications.checkPermission() == 1) {

        alert("Web Notifications are not allowed, need to ask permission");

      } else {
        console.log("Web Notifications are not allowed");
      }
    } else if (window.Notification) {

      console.log("Web Notifications are supported with the W3C/Safari API");

      if (Notification.permissionLevel() === 'granted') {

        console.log("Web Notifications are allowed");
        new Notification('Notification Title', { 'body': 'Details on the notification...'});

      } else if (Notification.permissionLevel() === 'default') {

        alert("Web Notifications are not allowed, need to ask permission");

      } else {
        console.log("Web Notifications are not allowed");
      }

    } else {
      console.log("Web Notifications are not supported in this browser");
    }
  };

  var request_permission = function() {
    if (window.webkitNotifications && navigator.userAgent.indexOf("Chrome") > -1) {

      console.log("Web Notifications are supported with the WebKit API");

      if (webkitNotifications.checkPermission() == 1) {
        console.log("Web Notifications are not allowed, need to ask permission");
        webkitNotifications.requestPermission();
      }

    } else if (window.Notification) {

      console.log("Web Notifications are supported with the W3C/Safari API");

      if (Notification.permissionLevel() === 'default') {
        console.log("Web Notifications are not allowed, need to ask permission");
        Notification.requestPermission(function() { send_notification(); });
      }

    } else {
      console.log("Web Notifications are not supported in this browser");
    }
  };
/*
var socket = io.connect('http://10.44.15.105:3000/');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });






 /* 
if (window.webkitNotifications && navigator.userAgent.indexOf("Chrome") > -1) {

	  var havePermission = window.webkitNotifications.checkPermission();
	  if (havePermission == 0) {
	    // 0 is PERMISSION_ALLOWED
	    var notification = window.webkitNotifications.createNotification(
	      'http://i.stack.imgur.com/dmHl0.png',
	      'Chrome notification!',
	    'Here is the notification text'
	    );
	    
	    notification.onclick = function () {
	      window.open("http://stackoverflow.com/a/13328397/1269037");
	      notification.close();
	    }
	    notification.show();
	  } else {
	      window.webkitNotifications.requestPermission();
	  }
 	 console.log("Web Notifications are supported with the WebKit API");

} else if (window.Notification) {

	if (Notification.permissionLevel() === 'granted') {
	  	console.log("Web Notifications are allowed");
	  	var n = new Notification('Notification Title', {'body': 'Details on the notification...'});
	} else if (Notification.permissionLevel() === 'default') {
	 	console.log("Web Notifications are not allowed, need to ask permission");
	} else {
		Notification.requestPermission();
	  	console.log("Web Notifications are not allowed");
	}
  	console.log("Web Notifications are supported with the W3C/Safari API");
} else {
  	console.log("Web Notifications are not supported in this browser");
}*/