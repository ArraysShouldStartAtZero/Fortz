var MAX_SIZE=128;
var objs=[];

function resourceCounter(){
let counter=new PIXI.Text("Resources:"+player.resources);
app.stage.addChild(counter);

}

function updateChanged(objects){
unitCont.removeChildren();
//structCont.removeChildren();//use this for now
var k=0;
for(var i=0;i<objects.length;i++){//implement a system of removing items, excluding those that stayed in //place
	if(objects[i].type=='TOWER'||objects[i].type=='WALL'||objects[i].type=='STRGHD'||objects[i].type=='RESRCE'){
	let rmvble=true;
	let addable=false;
	for(var j=0;j<objs.length;j++){
		if(objs[j].id==objects[i].id){
		rmvble=false;
		addable=false;
		if(objs[j].pos_x==objects[i].pos_x&&objs[j].pos_y==objects[i].pos_y){
			if(objs[j].health!=objects[i].health){
			var u=1;
				if(objects[i].type=='STRGHD'){u=9;}
			structCont.getChildAt(k).mask=healthDisplay(objects[i].health,objects[i].pos_x,objects[i].pos_y,u);
			}
		break;
		}else{//handle
		structCont.removeChildAt(k);
		k--;
		addable=true;
		break;
		}
		}else{
		addable=true;
		}
	}
	if(rmvble){
	structCont.removeChildAt(k);
	k--;
	}else if(addable){
addGameObject(objects[i].type,objects[i].id,objects[i].pos_x,objects[i].pos_y,objects[i].health,objects[i].owner);
	}
k++;
	}else{
addGameObject(objects[i].type,objects[i].id,objects[i].pos_x,objects[i].pos_y,objects[i].health,objects[i].owner);
}
}
}

function addGameObject(type, uid, posX, posY, health, owner){
var adjX=posX*64-cX;//adjusted positions for camera position
var adjY=posY*64-cY;
if(type=='WALL'){
Structure(type,adjX,adjY,health, 'sprites/gry_wall.png' ,owner);
}else if(type=='TOWER'){
Structure(type,adjX,adjY,health, 'sprites/gry_twr.png' ,owner);
}else if(type=='STRGHD'){
Structure(type,adjX,adjY,health, 'sprites/gry_strghd.png' ,owner);
}else if(type=='INFNTR'||type=='CAVLRY'||type=='ARTLRY'||type=='WORKER'){
unit(type,adjX,adjY,health,owner);
}else if(type=='RESRCE'){
Resource(health,adjX,adjY);
}
}


function getIdByLoc(x, y){
var i;
for(i=0;i<objs.length;i++){
if(objs[i].pos_x*64==x&&objs[i].pos_y*64==y){
return objs[i].id;
}
}
return 0;
}

function gameOver(){
player.alive=false;
window.location="gameover.html";
}
