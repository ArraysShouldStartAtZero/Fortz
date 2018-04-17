var db = require('./DatabaseHandler.js');
var uh = require('./UnitHandler.js');

module.exports = {
  update: update;
};

function update(units) {
  db.getAllPlayers(function (players) {
    db.getAllResources(function (resources) {
      units.forEach((unit, index, array) => {
        if(unit.type === "WORKER") {
          uh.updateWorker(unit, resources, players.get(unit.owner));
        } else {
          uh.updateSoldier(unit, targets, players.get(unit.owner));
        }
      });
    });
  });
}
