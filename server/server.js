var express = require('express');
var sock = require('socket.io');
var sh = require('./js/SocketHandler.js');
var db = require('./js/DatabaseHandler.js');
var game = require('./js/Game.js');

//Creates the server and has it start listening on port 3000 (will change port later on)
var app = express();
var server = app.listen(3000, function() {
  console.log('Listening For requests on port 3000');
});

//Serves up the index.html of the client directory when client connects
app.use(express.static('../client/'));

//Socket.io setup
var io = sock(server);

console.log('Setting up Socket Handler');

//Register a callback for when clients connect
io.on('connection', function(socket) {
  console.log('Client Connected (', socket.id, ')');

  sh.hello_server(socket);

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
    console.log("Target requested");
  });

  socket.on('disconnect', function() {
    sh.disconnect(socket);
  });
});

console.log('Socket Handler Setup Complete');

db.clearAllObjects();
db.clearAllPlayers();
db.clearAllTargets();

db.generateResources();

setInterval(update, 33);

function update() {
  //Send out updates
  sh.update_server(io);
  sh.player_update_server(io);

  //Run game logic
  db.getAllUnits(game.update);
}
