var socket = io();
var notificationEl = document.getElementById('notification');

var mock = function() {
  socket.emit('mock', 'plz');
  return 'sending mock';
};

var renderNode = function(n) {
  var node = "";
  node += "<div>";
  node += n.key
  if (n.val) node += n.val;
  node += "</div>";

  return node;
}

var renderNotificationRecurse = function(notification) {
  var n = notification.shift();
  var render = renderNode(n);

  if (notification.length)
    render += renderNotificationRecurse(notification);

  return render;
};

var handleNotification = function(n) {
  console.log(n)

  notificationEl.innerHTML = renderNotificationRecurse(n);

  return 'handling new notification';
};

socket.on('notification', handleNotification);
