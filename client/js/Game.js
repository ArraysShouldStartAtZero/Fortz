var MAX_SIZE=128;
var objs=[];


function addGameObject(type, uid, posX, posY, health, owner){
var adjX=posX-cX;//adjusted positions for camera position
var adjY=posY-cY;
if(type=='WALL'){
Structure(type,adjX,adjY,health, 'sprites/gry_wall.png' ,owner);
}else if(type=='TOWER'){
Structure(type,adjX,adjY,health, 'sprites/gry_twr.png' ,owner);
}else if(type=='INFNTR'||type=='CAVLRY'||type=='ARTLRY'){
unit(type,adjX,adjY,health,owner);
}else if(type=='RESRCE'){
Resource(health,adjX,adjY);
}
}


function getIdByLoc(x, y){
var i;
for(i=0;i<objs.length;i++){
if(objs[i].x*64==x&&objs[i].y*64==y){
return objs[i].id;
}
}
return 0;
}

function gameOver(){
player.alive=false;
window.location="gameover.html";
}

