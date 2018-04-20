var MAX_SIZE=128;
var objs=[];


function addGameObject(type, uid, posX, posY, health, owner){
var adjX=posX-cX;//adjusted positions for camera position
var adjY=posY-cY;
if(type=='wall'){
Structure(type,adjX,adjY,health, 'sprites/gry_wall.png' ,owner);
}else if(type=='tower'){
Structure(type,adjX,adjY,health, 'sprites/gry_twr.png' ,owner);
}else if(type=='soldier'||type=='cavalry'||type=='artilery'){
unit(type,adjX,adjY,health,owner);
}else if(type=='resource'){
Resource(health,adjX,adjY);
}
makeButtons();
}

function spawnPlayer(x,y){
	new Fort(x+window.innerWidth/2,y+window.innerHeight/2, player.name);		

}


function getIdByLoc(x, y){
var i;
for(i=0;i<objs.length;i++){
if(objs[i].x==x&&objs[i].y==y){
return objs[i].id;
}
}
return 0;
}

function gameOver(){
player.alive=false;
//display an interactive 'you lost' message

}

