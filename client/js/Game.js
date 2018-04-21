var MAX_SIZE=128;
var objs=[];

function resourceCounter(){
let counter=new Text("Resources:"+player.resources);
counter.x=window.innerWidth-128;
counter.y=0;
app.stage.addChild(counter);

}

function addGameObject(type, uid, posX, posY, health, owner){
var adjX=posX*64-cX;//adjusted positions for camera position
var adjY=posY*64-cY;
if(type=='WALL'){
Structure(type,adjX,adjY,health, 'sprites/gry_twr.png' ,owner);
}else if(type=='TOWER'){
Structure(type,adjX,adjY,health, 'sprites/gry_twr.png' ,owner);
}else if(type=='STRGHD'){
Structure(type,adjX,adjY,health, 'sprites/gry_twr.png' ,owner);
}else if(type=='INFNTR'||type=='CAVLRY'||type=='ARTLRY'||type=='WORKER'){
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

