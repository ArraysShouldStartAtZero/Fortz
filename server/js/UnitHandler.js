///////////need to initialize elsewhere?
val maxVal=30;
////////////

function updateWorker(unit, resources, player) {
  var targetRes = findNearestResource(unit, resources, player);
  if(Math.abs(targetRes.pos_x - unit.pos_x) <= 1 && Math.abs(targetRes.pos_y - unit.pos_y) <= 1) { //Collect resource
    db.collectResource(targetRes, player);
    db.spawnNewResource();
  } else { //Head toward resource
    //TODO
  }
}

function updateSoldier(unit, player) {
  //Find nearest target
var nearestTarget;
if(player.targets.length<1){return;}
else{nearestTarget=player.targets[0];}
for(var i=1;i<player.targets.length;i++){
if(getDistance(unit,nearestTarget)>getDistance(unit,player.targets.length)){
nearestTarget=player.targets[i];
}
}
  //Head toward target
  //If at target, attack target
  //If at other enemy object, attack object
}

//TODO limit this to worker_radius from stronghold
function findNearestResource(worker, resources, player) {
  var close_resource;
  var res_dist = 1000
  resources.forEach((res, index, array) => {
    var dist = getDistance(res, worker);
    if(dist < res_dist) {
      res_dist = dist;
      close_resource = res;
    }
  });
  return close_resource;
}

function getDistance(object1, object2) {
  var dx = Math.abs(object1.pos_x - object2.pos_x);
  var dy = Math.abs(object1.pos_y - object2.pos_y);
  return Math.sqrt(dx*dx + dy*dy);
}


//run the following for the duration of the server's uptime
function spawnResources(){
	GameObject("resource", 0, Math.random()*MAP_SIZE, Math.random()*MAP_SIZE, Math.random()*maxVal, "server");//use obj health to store resource value
}
