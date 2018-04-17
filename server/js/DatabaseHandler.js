var mysql = require('mysql');

var conn = mysql.createConnection({
  host: "localhost",
  user: "fortz_server",
  password: "5%forNothing",
  database: "world-data"
});

conn.connect(function(err) {
  if(err) throw err;
  console.log("Connected to database!");
});

module.exports = {
  getAllObjects: getAllObjects,
  getPlayerData: getPlayerData,
  getPlayerRes: getPlayerRes,
  addPlayerRes: addPlayerRes,
  subtractPlayerRes, subtractPlayerRes,
  createObject: createObject,
  objectExists: objectExists,
  addTarget: addTarget,
  authUser: authUser,
  prepareUser: prepareUser,
  buildFort: buildFort,
  updateRadius: updateRadius
};

/* Query Structure:
var sql = "SELECT * FROM game_objects"
conn.query(sql, function(err, result) {
  if(err) throw err;
  console.log("Result: " + result);
});
*/

/* Queries the game_objects table for all of its
   contents and puts those into an array, which
   it passes on as an argument to the callback
   function provided. */
function getAllObjects(callback) {
  var sql = "SELECT * FROM game_objects";
  conn.query(sql, function(err, result) {
    var objArr = [];
    if(err) throw err;
    result.forEach((element, index, array) => {
      objArr.push(element);
    });
    callback(objArr);
  });
}

/* Queries database to retrieve data about the player,
   then constructs a player object with the response's
   username, resources, and worker_radius, as well as
   an empty target array, which will be filled when it
   calls getPlayerTargets. */
function getPlayerData(name, callback) {
  var sql = "SELECT * FROM users WHERE username = ?";
  conn.query(sql, [name], function(err, result) {
    if(err) throw err;
    var player = new Player(result[0].username, result[0].resources, result[0].worker_radius, []);
    getPlayerTargets(player, callback);
  });
}

/* Receives a player object with empty targets. Queries
   the targets table for all targets that belong to the
   player whose name matches the player.name and adds
   them to the player.targets array, before calling
   callback with the completed player object */
function getPlayerTargets(player, callback) {
  var sql = "SELECT * FROM targets WHERE player = ?";
  conn.query(sql, [player.name], function(err, result) {
    if(err) throw err;
    result.forEach((element, index, array) => {
      player.targets.push(element);
    });
    callback(player);
  });
}

function getPlayerRes(player, callback) {
  var sql = "SELECT * FROM users WHERE username = ?";
  conn.query(sql, [player], function(err, result) {
    if(err) throw err;
    if(result.length !== 1) throw new Error("Player \'" + player + "\' was not found!");
    callback(result[0].resources);
  });
}

function subtractPlayerRes(player, amount, currAmt) {
  var sql = "UPDATE users SET resources = ? WHERE username = ?";
  conn.query(sql, [currAmt - amount, player], function(err, result) {
    if(err) throw err;
  });
}

function addPlayerRes(player, amount) {
  getPlayerRes(player, function(playerRes) {
    var sql = "UPDATE users SET resources = ? WHERE username = ?";
    conn.query(sql, [playerRes + amount, player], function(err, result) {
      if(err) throw err;
    });
  });
}

//TODO implement health per unit
function createObject(type, player, position) {
  var sql = "INSERT INTO game_objects (type, pos_x, pos_y, owner, health) VALUES (?, ?, ?, ?, ?)";
  conn.query(sql, [type, position.posX, position.posY, player, 100], function(err, result) {
    if(err) throw err;
  });
}

function objectExists(object_id, callback) {
  var sql = "SELECT * FROM game_objects WHERE id = ?";
  conn.query(sql, [object_id], function(err, result) {
    if(err) throw err;
    if(result.length === 0) callback(false);
    else callback(true);
  });
}

function addTarget(player, object_id) {
  objectExists(object_id, function(exists) {
    if(exists) {
      var sql = "INSERT INTO targets (object_id, player) VALUES (?, ?)"
      conn.query(sql, [object_id, player], function(err, result) {
        if(err) throw err;
      });
    }
  });
}

/* LOL, this will be implemented once we actualy get
   the game up and running. Returns true currently
   for simplicity sake while testing. */
function authUser(username) {
  return true; //TODO
}

/* Updates the resources and worker_radius of the player with the given name
   in the users table to starting values and logs a message when complete. */
function prepareUser(username) {
  var sql = "UPDATE users SET resources = ?, worker_radius = ? WHERE username = ?";
  conn.query(sql, [500, 10, username], function(err, result) {
    if(err) throw err;
    console.log('Set initial resources and worker radius for \'', username, '\'.');
  });
}

/* Constructs an inital fort for the player whose name is given
   (name is not checked for validity) and puts all the objects
   in the game_objects table. Prints out a message when complete */
function buildFort(position, playerName) {
  var sql = "INSERT INTO game_objects (type, pos_x, pos_y, owner, health) VALUES ?";
  var values = [
    ['TOWER', position.posX, position.posY, playerName, 100],
    ['TOWER', position.posX + 6, position.posY, playerName, 100],
    ['TOWER', position.posX, position.posY + 6, playerName, 100],
    ['TOWER', position.posX + 6, position.posY + 6, playerName, 100],
    ['STRGHD', position.posX + 2, position.posY + 2, playerName, 200]
  ];
  for(i=1; i<=5; i++) {
    values.push(['WALL', position.posX + i, position.posY, playerName, 100]);
    values.push(['WALL', position.posX, position.posY + i, playerName, 100]);
    values.push(['WALL', position.posX + i, position.posY + 6, playerName, 100]);
    values.push(['WALL', position.posX + 6, position.posY + i, playerName, 100]);
  }
  conn.query(sql, [values], function(err, result) {
    if(err) throw err;
    console.log('Built Fort for \'', playerName, '\' at position (', position.posX, ', ', position.posY, ')');
  });
}

function updateRadius(playerName, radius) {
  var sql = "UPDATE users SET worker_radius = ? WHERE username = ?";
  conn.query(sql, [radius, playerName], function(err, result) {
    if(err) throw err;
    console.log("Updated Radius for \'", playerName, "\' to ", radius);
  });
}
