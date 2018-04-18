var db = require('./DatabaseHandler.js');
var uh = require('./UnitHandler.js');

var moveCounter = 0;

module.exports = {
  update: update
};

function update(units) {
  moveCounter++;
  var move = false;
  if(moveCounter >= 50) {
    move = true;
    moveCounter = 0;
  }
  db.getAllPlayers(function (players) {
    db.getAllResources(function (resources) {
      units.forEach((unit, index, array) => {
        if(unit.type === "WORKER") {
          uh.updateWorker(unit, resources, players.get(unit.owner), move);
        } else {
          uh.updateSoldier(unit, targets, players.get(unit.owner), move);
        }
      });
    });
  });
}