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


const jobs = [
  {
    job0: {}
  },
  {
    job1: {}
  },
  {
    job2: {}
  }
];

let doMock = false;

const eachJobRecurse = (job, jobs) => {
  if (!doMock) return;

  const r = Math.round(Math.random() * 1000);
  setTimeout(() => {
    job.task = r;
    io.emit('notification', jobs);
    eachJobRecurse(job, jobs);
  }, r);
};

const handleMock = bool => {
  doMock = bool;
  jobs.forEach(job => eachJobRecurse(job, jobs));
};

io.on('connection', socket => {
  io.emit('notification', jobs);
  socket.on('mock', handleMock);
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
