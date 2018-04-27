const socket = io();
const notificationEl = document.getElementById('notification');

/*
| mock state changes
*/
const mock = () => {
  socket.emit('mock', 'plz');
  return 'sending mock';
};

/*
| reduce html array to string
*/
const reduceHtml = (prev, curr) => `${prev} ${curr} <div class="gap"></div>`;

/*
| create notification html
*/
const notificationHtml = n => {
  const htmlArr = n.map(n => renderHtml(n)); // renderHtml() is a self-contained method in another file
  return htmlArr.reduce(reduceHtml, '');
}

/*
| handle new notification
*/
const handleNotification = notification => {
  notificationEl.innerHTML = notificationHtml(notification);
  return 'handling new notification';
};

/*
|
| socket listener
|
*/
socket.on('notification', handleNotification);
