/*
|
| real-time state notification
|
*/
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

const jobs = [{ job0: {} }, { job1: {} }, { job2: {} }];

let isSending = false;

const eachJobRecurse = (job, jobs) => {
  if (!isSending) return;

  const r = Math.round(Math.random() * 1000);
  setTimeout(() => {
    job.task = r;
    io.emit("notification", jobs);
    eachJobRecurse(job, jobs);
  }, r);
};

const sendJobsState = (bool) => {
  isSending = bool;
  jobs.forEach((job) => eachJobRecurse(job, jobs));
};

io.on("connection", (socket) => {
  io.emit("notification", jobs);
  socket.on("mock", sendJobsState);
});

http.listen(3000, function () {
  console.log("listening on *:3000");
});
