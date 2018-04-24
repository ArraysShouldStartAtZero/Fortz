var db = require('./DatabaseHandler.js');

module.exports = {
  updateWorker: updateWorker,
  updateSoldier: updateSoldier
};

function updateWorker(unit, resources, player, move) {
  var targetRes = findNearestResource(unit, resources, player);
  if(targetRes == null) return;
  if(Math.abs(targetRes.pos_x - unit.pos_x) <= 1 && Math.abs(targetRes.pos_y - unit.pos_y) <= 1) { //Collect resource
    db.collectResource(targetRes, player);
    db.spawnNewResource();
  } else if (move) { //Head toward resource
    var dx = targetRes.pos_x - unit.pos_x;
    var dy = targetRes.pos_y - unit.pos_y;
    if(Math.abs(dx) > Math.abs(dy)) { //Move in x
      if (dx > 0) {
        db.moveUnit(unit, unit.pos_x + 1, unit.pos_y);
      } else {
        db.moveUnit(unit, unit.pos_x - 1, unit.pos_y);
      }
    } else { //Move in y
      if (dy > 0) {
        db.moveUnit(unit, unit.pos_x, unit.pos_y + 1);
      } else {
        db.moveUnit(unit, unit.pos_x, unit.pos_y - 1);
      }
    }
  }
}

function findObject(id, objects) {
  for(var i = 0; i < objects.length; i++) {
    if(objects[i].id === id) {
      return objects[i];
    }
  }
  return null;
}

function updateSoldier(unit, player, move, objects) {
  //Find nearest target
  var nearestTarget;
  if(player.targets.length<1) return;
  var nearestTarget;
  var nearestDistance = 1000;
  var targetObject;

  for(var i=1; i < player.targets.length; i++){
    var object = findObject(player.targets[0].object_id, objects);
    if(object == null) return;
    var dist = getDistance(unit, object);
    if(dist < nearestDistance){
      nearestTarget = player.targets[i];
      nearestDistance = dist;
      targetObject = object;
    }
  }
  //Head toward target
  var dx = Math.abs(nearestTarget.pos_x - unit.pos_x);
  var dy = Math.abs(nearestTarget.pos_y - unit.pos_y);
  if(dx > dy) { //Move in x direction
    if(nearestTarget.pos_x > unit.pos_x) {
      db.moveUnit(unit, unit.pos_x + 1, unit.pos_y);
    } else {
      db.moveUnit(unit, unit.pos_x - 1, unit.pos_y);
    }
  } else { //Move in y direction
    if(nearestTarget.pos_y > unit.pos_y) {
      db.moveUnit(unit, unit.pos_x, unit.pos_y + 1);
    } else {
      db.moveUnit(unit, unit.pos_x, unit.pos_y - 1);
    }
  }
  //If at target, attack target
  //If at other enemy object, attack object
  /*collision(unit, 1, function(enemy) {
    if(enemy!=null){
      unitAttack(unit,enemy);
    }
  });*/
}

function collision(unit, dist, callback){//TODO
  //search all and return first found within provided collision distance   else NULL
  db.getAllObjects(function(objects) {
    for(var i=0;i<objects.length;i++){
	    if(objects[i].owner!='SERVER'&&objects[i].owner!=unit.owner){
	      if(objects[i].pos_x-unit.pos_x<=dist&&objects[i].pos_x-unit.pos_x>-dist){
	        if(objects[i].pos_y-unit.pos_y<=dist&&objects[i].pos_y-unit.pos_y>-dist){
	          callback(objects[i]);
	        }
	      }
      }
    }
    callback(null);
  });
}

function unitAttack(p1, p2){
  var mult=1;
  if(p1.type=='INFNTR'){
	  if(p2.type=='CAVLRY'){
	    mult=.5;
	  }else if(p2.type=='ARTLRY'){
	    mult=2;
	  }else{}
  }else if(p1.type=='CAVLRY'){
	  if(p2.type=='ARTLRY'){
	    mult=.5;
	  }else if(p2.type=='INFNTR'){
	    mult=2;
	  }else{}
  }else{
	  if(p2.type=='INFNTR'){
	    mult=.5;
	  }else if(p2.type=='CAVLRY'){
	    mult=2;
	  }else{}
  }
  db.unitSetHealth(p2.id, p2.health - 10*mult);
}

//TODO set up stronghold_x and stronghold_y
function findNearestResource(worker, resources, player) {
  var close_resource;
  var res_dist = 1000
  resources.forEach((res, index, array) => {
    var dist = getDistance(res, worker);
    if(dist < res_dist) {
      var fortPos = {
        pos_x: player.stronghold_x,
        pos_y: player.stronghold_y
      };
      var distFromFort = getDistance(res, fortPos);
      if(distFromFort <= player.worker_radius) {
        res_dist = dist;
        close_resource = res;
      }
    }
  });
  if(close_resource == null) {
    return null;
  }
  return close_resource;
}

function getDistance(object1, object2) {
  var dx = Math.abs(object1.pos_x - object2.pos_x);
  var dy = Math.abs(object1.pos_y - object2.pos_y);
  return Math.sqrt(dx*dx + dy*dy);
}
