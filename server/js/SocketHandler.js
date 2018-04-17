var db = require('DatabaseHandler.js');
var socketPlayerMap = new Map();

var MAP_SIZE = 128;
var MAX_RADIUS = 32;

function hello_server(socket) {
  socket.emit('hello-server', 'Hello');
}

function user_unknown_server(username, socket) {
  socket.emit('user-unknown-server', username);
}

function fort_placement_server(socket) {
  var position = {
    posX: Math.floor(Math.random() * MAP_SIZE),
    posY: Math.floor(Math.random() * MAP_SIZE)
  }
  db.buildFort(position, socketPlayerMap.get(socket.id));
  socket.emit('fort-placement-server', position);
}

//TODO somehow remove player from registry so they can't send more requests
//as well as delete all of their game objects
function game_over_server(socket) {
  socket.emit('game-over-server', 'Game Over');
}

function player_update_server(socket) {
  io.sockets.clients().forEach(function(socket) {
    db.getPlayerData(socketPlayerMap.get(socket.id), function(playerData) {
      socket.emit('player-update-server', playerData);
    });
  });
}

function update_server(socket) {
  db.getAllObjects(function(objects) {
    io.sockets.emit('update-server', objects);
  });
}

function hello_client(resp, socket) {
  console.log(resp.username + " said hello!");
  var isValid = db.authUser(resp.username);

  if(isValid) {
    socketPlayerMap.set(socket.id, resp.username);
    db.prepareUser(resp.username);
    fort_placement_server(socket);
  } else {
    user_unknown_server(resp.username, socket);
  }
}

//TODO later - not vital to basic game functioning
function object_upgrade_client(socket) {

}

function worker_radius_change_client(socket, newRadius) {
  if(newRadius > 0 && newRadius <= MAX_RADIUS) {
    db.updateRadius(socketPlayerMap.get(socket.id), newRadius);
  }
}

function unit_purchase_client(socket, type, position) {
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

function target_object_client(socket, object_id) {
  db.addTarget(socketPlayerMap.get(socket.id), object_id);
}
