var mysql = require('mysql');

var conn = mysql.createConnection({
  host: "localhost",
  user: "fortz_server",
  password: "f0rtzio1sgre4t!",
  database: "world-data"
});

con.connect(function(err) {
  if(err) throw err;
  console.log("Connected to database!");
});

/* Query Structure:
var sql = "SELECT * FROM game_objects"
con.query(sql, function(err, result) {
  if(err) throw err;
  console.log("Result: " + result);
});
*/
