const socket = io();
let doMock = false;

const headerEl = document.getElementsByTagName('header')[0];
const notificationEl = document.getElementById('notification');
const startMockBtn = document.getElementById('start-mock');
const stopMockBtn = document.getElementById('stop-mock');

/*
| set header class
*/
const setHeaderClass = headerClass => headerEl.className = headerClass;

/*
| toggle doMock
*/
const setDoMock = bool => {
  doMock = bool;
  mock(bool);

  const headerClass = bool ? 'started' : '';
  setHeaderClass(headerClass);
};

/*
| listeners
*/
startMockBtn.addEventListener('click', () => setDoMock(true));
stopMockBtn.addEventListener('click', () => setDoMock(false));

/*
| mock state changes
*/
const mock = bool => {
  socket.emit('mock', bool);
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
