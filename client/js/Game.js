var MAX_SIZE=128;
var objs=[];

function resourceCounter(){
  uiCont.removeChild(counter);
  counter=new PIXI.Text("Resources:"+player.resources);
  uiCont.addChild(counter);
}

function updateChanged(objects){///////
  var k=-1;
  var l=-1;
  var j=0;
  for(var i=0;i<objects.length;i++){//implement a system of removing items, excluding those that stayed in //place
if(objects[i].type==='TOWER'||objects[i].type==='WALL'||objects[i].type==='STRGHD'){k++;}else{l++;}
  }
  if(j<objs.length){
    if(objs[j]===objects[i]){
     if(objects[i].type==='TOWER'||objects[i].type==='WALL'||objects[i].type==='STRGHD'){
	}else{
		if(objs[j].pos_x===objects[i].pos_x&&objs[j].pos_y===objects[i].pos_y){}else{
	unitCont.removeChildAt(l);
	addGameObject(objects[i].type,objects[i].id,objects[i].pos_x,objects[i].pos_y,objects[i].health,objects[i].owner);
	l--;
		}
	}
        }else{
     if(objs[j].type==='TOWER'||objs[j].type==='WALL'||objs[j].type==='STRGHD'){
	structCont.removeChildAt(k);
	k--;
	}else{
	unitCont.removeChildAt(l);
	l--;
	}
    i--;
    }	
    j++;
  }else{
addGameObject(objects[i].type,objects[i].id,objects[i].pos_x,objects[i].pos_y,objects[i].health,objects[i].owner);
  }

}

function updateChangedNew(objects) {
  unitCont.removeChildren();

  //Add new structures and all units
  var structureCounter = 0;
  for(var i=0; i<objects.length; i++) {
    if(objects[i].type === 'TOWER' || objects[i].type === 'WALL' || objects[i].type === 'STRGHD') {
      var isNew = true;
      for(var j=0; i<objs.length; j++) {
        if(objs[j].id === objects[i].id) {
          isNew = true;
          break;
        }
      }
      if(isNew) {
        addGameObject(objects[i].type, objects[i].id, objects[i].pos_x, objects[i].pos_y, objects[i].health, objects[i].owner);
      }
    } else {
      addGameObject(objects[i].type, objects[i].id, objects[i].pos_x, objects[i].pos_y, objects[i].health, objects[i].owner);
    }
  }

  //Remove deleted structures
  for(var i=0; i<objs.length; i++) {
    if(objs[i].type === 'TOWER' || objs[i].type === 'WALL' || objs[i].type === 'STRGHD') {
      structureCounter++;
      var isGone = true;
      for(var j=0; j<objects.length; j++) {
        if(objects[j].id === objs[i].id) {
          isGone = false;
          break;
        }
      }
      if(isGone) {
        structCont.removeChildAt(structureCounter);
        structureCounter--;
      }
    }
  }
}

function addGameObject(type, uid, posX, posY, health, owner){
  var adjX=posX*64-dcX;//adjusted positions for camera position
  var adjY=posY*64-dcY;
  if(type==='WALL'){
    Structure(type,adjX,adjY,health, 'sprites/gry_wall.png' ,owner);
  }else if(type==='TOWER'){
    Structure(type,adjX,adjY,health, 'sprites/gry_twr.png' ,owner);
  }else if(type==='STRGHD'){
    Structure(type,adjX,adjY,health, 'sprites/gry_strghd.png' ,owner);
  }else if(type==='INFNTR'||type==='CAVLRY'||type==='ARTLRY'||type==='WORKER'){
    unit(type,adjX,adjY,health,owner);
  }else if(type==='RESRCE'){
    Resource(health,adjX,adjY);
  }
}


function getByLoc(x, y){
  var i;
  for(i=0;i<objs.length;i++){
    if(objs[i].pos_x === x && objs[i].pos_y === y){
      console.log("target_id:"+objs[i].id);
      return objs[i];
    }
  }
  return 0;
}

function gameOver(){
  player.alive=false;
  window.location="gameover.html";
}
