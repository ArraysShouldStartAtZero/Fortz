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
  getAllObjects();
});

/* Query Structure:
var sql = "SELECT * FROM game_objects"
conn.query(sql, function(err, result) {
  if(err) throw err;
  console.log("Result: " + result);
});
*/

function getAllObjects() {
  var sql = "SELECT * FROM game_objects";
  conn.query(sql, function(err, result) {
    if(err) throw err;
    result.forEach((element, index, array) => {
      console.log(element.type, " ", element.id, " ", element.pos_x, " ", element.pos_y, " ", element.owner, " ", element.health);
    });
  });
}

function getPlayerBySocket(socketID) {

}

function authUser(username) {
  return true;
}

function prepareUser(username) {

}
