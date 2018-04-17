function addGameObject(type, uid, posX, posY, health, owner){
val adjX=posX-cX;//adjusted positions for camera position
val adjY=posY-cY;
if(type=='wall'||type=='tower'){
Structure(type,adjX,adjY,health,owner);
}else if(type=='soldier'||type=='cavalry'||type=='artilery'){
unit(type,adjX,adjY,health,owner);
}else if(type=='resource'){
Resource(health,adjX,adjY);
}

}

function spawnPlayer(x,y){
	new Fort(x+window.innerWidth/2,y+window.innerHeight/2, user);		

}


function gameOver(){
player.alive=false;
//display an interactive 'you lost' message

}

