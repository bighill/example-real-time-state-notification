const socket = io();
const notificationEl = document.getElementById('notification');

const mock = () => {
  socket.emit('mock', 'plz');
  return 'sending mock';
};

const renderNode = (key, val, indent) => {
  const displayVal = val ? `... ${val}` : '';
  return `
    <div style='margin-left:${indent}em;'>
      ${key} ${displayVal}
    </div>
  `;
}

const renderNotificationRecurse = function(notification, indent) {
  const n = notification;
  let render = "";

  for (const prop in n) {
    if (!n.hasOwnProperty(prop)) contine;

    const key = prop;
    const val = n[prop];

    if (typeof val === "object") {
      render += renderNode(key, false, indent);
      render += renderNotificationRecurse(val, indent + 1);
    } else {
      render += renderNode(key, val, indent);
    }
  }

  return render;
};

const handleNotification = function(n) {
  let html = n.map(n => renderNotificationRecurse(n, 0));
  html = html.reduce((prev, curr) => {
    return `${prev} ${curr} <div class="gap"></div>`;
  }, '');
  notificationEl.innerHTML = html;

  return 'handling new notification';
};

socket.on('notification', handleNotification);
