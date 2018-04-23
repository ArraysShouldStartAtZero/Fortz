var db = require('./DatabaseHandler.js');

module.exports = {
  updateWorker: updateWorker,
  updateSoldier: updateSoldier
};

function updateWorker(unit, resources, player, move) {
  var targetRes = findNearestResource(unit, resources, player);
  if(Object.keys(targetRes).length === 0 && targetRes.constructor === Object) return;
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

function updateSoldier(unit, player, move) {
  //Find nearest target
  var nearestTarget;
  if(!player.targets) return;
  if(player.targets.length<1) return;
  else nearestTarget=player.targets[0];

  for(var i=1;i<player.targets.length;i++){
    if(getDistance(unit,nearestTarget)>getDistance(unit,player.targets.length)){
      nearestTarget=player.targets[i];
    }
  }
  //Head toward target
if(unit.pos_x<nearestTarget.pos_x){
unit.pos_x++;
}else if(unit.pos_x==nearestTarget.pos_x){
}else{
unit.pos_x--;
}
if(unit.pos_y<nearestTarget.pos_y){
unit.pos_y++;
}else if(unit.pos_y==nearestTarget.pos_y){
}else{
unit.pos_y--;
}
        db.moveUnit(unit, unit.pos_x, unit.pos_y);
  //If at target, attack target
  //If at other enemy object, attack object
var enemy=collision(unit,1);
if(enemy!=NULL){
unitAttack(unit,enemy);
}
}

function collision(unit, dist){//TODO
//search all and return first found within provided collision distance   else NULL
for(var i=0;i<objects.length;i++){
var objects=db.getAllObjects();
	if(objects[i].owner!='SERVER'&&objects[i].owner!=unit.owner){
	if(objects[i].pos_x-unit.pos_x<=dist&&objects[i].pos_x-unit.pos_x>-dist){
	if(objects[i].pos_y-unit.pos_y<=dist&&objects[i].pos_y-unit.pos_y>-dist){
	return objects[i];
	}
	}
}
}
return NULL;
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
p2.health-=10*mult;
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
  if(Object.keys(close_resource).length === 0 && close_resource.constructor === Object) {
    return null;
  }
  return close_resource;
}

function getDistance(object1, object2) {
  var dx = Math.abs(object1.pos_x - object2.pos_x);
  var dy = Math.abs(object1.pos_y - object2.pos_y);
  return Math.sqrt(dx*dx + dy*dy);
}