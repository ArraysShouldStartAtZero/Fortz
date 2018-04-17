var db = require('DatabaseManager.js');
var socketPlayerMap = new Map();

var MAP_SIZE = 128;
var MAX_RADIUS = 32;

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
  db.buildFort(position, socketPlayerMap.get(socket.id));
  socket.emit('fort-placement-server', position);
}

//TODO somehow remove player from registry so they can't send more requests
//as well as delete all of their game objects
function game-over-server(socket) {
  socket.emit('game-over-server', 'Game Over');
}

function player-update-server(socket) {
  io.sockets.clients().forEach(function(socket) {
    db.getPlayerData(socketPlayerMap.get(socket.id), function(playerData) {
      socket.emit('player-update-server', playerData);
    });
  });
}

function update-server(socket) {
  db.getAllObjects(function(objects) {
    io.sockets.emit('update-server', objects);
  });
}

function hello-client(resp, socket) {
  console.log(resp.username + " said hello!");
  var isValid = db.authUser(resp.username);

  if(isValid) {
    socketPlayerMap.set(socket.id, resp.username);
    db.prepareUser(resp.username);
    fort-placement-server(socket);
  } else {
    user-unknown-server(resp.username, socket);
  }
}

//TODO later - not vital to basic game functioning
function object-upgrade-client(socket) {

}

function worker-radius-change-client(socket, newRadius) {
  if(newRadius > 0 && newRadius <= MAX_RADIUS) {
    db.updateRadius(socketPlayerMap.get(socket.id), newRadius);
  }
}

function unit-purchase-client(socket, type, position) {
  var price = getUnitPrice(type);
  var player = socketPlayerMap.get(socket.id)
  if(price !== -1) {
    db.getPlayerRes(player, function(playerRes) {
      if (playerRes >= price) {
        db.subtractPlayerRes(player, price, playerRes);
        db.createObject(type, player, position);
      }
    });
  }
}

function getUnitPrice(type) {
  switch(type) {
    case "WORKER":
      return 100;
    case "CAVLRY":
      return 200;
    case "INFNTR":
      return 200;
    case "ARTLRY":
      return 200;
    default:
      return -1;
  }
}

function target-object-client(socket, object_id) {
  db.addTarget(socketPlayerMap.get(socket.id), object_id);
}
