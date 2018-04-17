var express = require('express');
var sock = require('socket.io');
var sh = require('./js/SocketHandler.js');
var db = require('./js/DatabaseHandler.js');

//Creates the server and has it start listening on port 3000 (will change port later on)
var app = express();
var server = app.listen(3000, function() {
  console.log('Listening For requests on port 3000');
});

//Serves up the index.html of the client directory when client connects
app.use(express.static('../client/'));

//Socket.io setup
var io = sock(server);

//Register a callback for when clients connect
io.on('connection', function(socket) {
  console.log('Client Connected (', socket.id, ')');

  hello_server(socket);

  socket.on('hello-client', function(resp) {
    sh.hello_client(resp, socket);
  });

  socket.on('object-upgrade-client', function(resp) {
    sh.object_upgrade_client(socket);
  });

  socket.on('worker-radius-change-client', function(resp) {
    sh.worker_radius_change_client(socket, resp.radius);
  });

  socket.on('unit-purchase-client', function(resp) {
    sh.unit_purchase_client(socket, resp.type, resp.position);
  });

  socket.on('target-object-client', function(resp) {
    sh.target_object_client(socket, resp.object_id);
  });

  socket.on('disconnect', function() {
    console.log("A socket connection was closed.");
  });
});
