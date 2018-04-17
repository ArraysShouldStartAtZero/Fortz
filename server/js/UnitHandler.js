///////////need to initialize elsewhere?
val maxVal=30;
////////////

function playerSpawn(){
Player("user",100,2,null);
}

function workerController(centerX, centerY, radius){
//TODO move worker pos to nearest resource within circle, then, upon contact, destroy resource and incr player resources repeat
}


//run the following for the duration of the server's uptime
function spawnResources(){
	GameObject("resource", 0, Math.random()*MAP_SIZE, Math.random()*MAP_SIZE, Math.random()*maxVal, "server");//use obj health to store resource value
}