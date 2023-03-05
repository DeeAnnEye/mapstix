var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');
// const server = http.createServer(app);
const socketio = require('socket.io')
// const { Server } = require("socket.io");
// const io = new Server(server)
// server.listen(3000);
// console.log(server)
// http.listen(3000, "0.0.0.0");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var groupsRouter = require('./routes/groups');


var app = express();
const server = http.createServer(app)
const io = socketio(server)
server.listen(3000, "192.168.1.6");
const groupSpace = io.of("/groupSpace");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);

//socket connection
groupSpace.on("connection", (socket) => {
  console.log('socket connected');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
