/*The structure of GameObjects is extremely simplified on the server end
  in order to maintain speed - with it structured this way, we have to do
  a lot less work for each update, so we can push updates faster and make
  the game run faster. Updates will just pull all GameObjects from the
  database, parse them into this object, then push array of all objects out
  to the players */
module.exports = {
  Player: Player
};

function Player (name, resources, worker_radius, stronghold_x, stronghold_y, targets) {
  this.name = name;
  this.resources = resources;
  this.worker_radius = worker_radius;
  this.stronghold_x = stronghold_x;
  this.stronghold_y = stronghold_y;
  this.targets = targets;
}
