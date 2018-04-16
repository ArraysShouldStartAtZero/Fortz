var socket = require('socket.io');
var db = require('DatabaseManager.js');

io.on('connection', function(socket) {
  console.log("New Client Connected (" + socket.id + ")");
  
});

function hello-server(socket) {
  socket.emit('hello-server', 'Hello');
}

function user-unknown-server(username, socket) {
  socket.emit('user-unknown-server', username);
}

function fort-placement-server(socket) {
  var position = {
    posX: Math.floor(Math.random() * MAP_SIZE);
    posY: Math.floor(Math.random() * MAP_SIZE);
  }

  socket.emit('fort-placement-server', position);
}

function game-over-server(socket) {
  socket.emit('game-over-server', 'Game Over');
}

function player-update-server(socket) {
  io.sockets.clients().forEach(function(socket) {
    var playerData = db.getPlayerBySocket(socket.id);
    socket.emit('player-update-server', playerData);
  });
}

function update-server(socket) {
  var objects = db.getAllObjects();
  io.sockets.emit('update-server', objects);
}

function hello-client(resp, socket) {
  console.log(resp.username + " said hello!");
  var isValid = db.authUser(resp.username);

  if(isValid) {
    db.prepareUser(resp.username);
    fort-placement-server(socket);
  } else {
    user-unknown-server(resp.username, socket);
  }
}

function object-upgrade-client(socket) {

}

function worker-radius-change-client(socket) {

}

function unit-purchase-client(socket) {

}

function target-object-client(socket) {

}
