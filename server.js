/*
|
| real-time state notification
|
*/
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});


const sample = [
  {
    key: 'foo',
    val: 'bar'
  },
  {
    key: 'bleep',
    val: 'blop'
  },
  {
    key: 'slow'
  }
];

const handleMock = mess => {
  io.emit('notification', sample);
};

io.on('connection', socket => {
  socket.on('mock', handleMock);
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
