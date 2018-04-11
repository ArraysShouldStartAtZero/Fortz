var express = require('express');
var socket = require('socket.io');

//Creates the server and has it start listening on port 3000 (will change port later on)
var app = express();
var server = app.listen(3000, function() {
  console.log('Listening For requests on port 3000');
});

//Serves up the index.html of the client directory when client connects
app.use(express.static('../client/'));

//Socket.io setup
var io = socket(server);

//Register a callback for when clients connect
io.on('connection', function(socket) {
  console.log('Made socket connection', socket.id);
});
