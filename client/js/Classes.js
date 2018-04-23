function GameObject (object,sprite, hp, posX, posY,owner) {
object.posX = posX;
  object.posY = posY;
object.owner=owner;
if(sprite=="sprites/resources.png"){
object.sprite = getSpriteFromSheet(sprite,owner,posX,posY);
}else{
  object.sprite = getSprite(sprite,owner,posX,posY,hp);
}  
};

function Structure (type, posX, posY, health, sprite, owner) {
 let struct={};
 GameObject.call(this,struct, sprite,health , posX, posY, owner);
 struct.health = health;
  struct.type = type;
return struct;
};

function unit (type, posX, posY, health, sprite, owner) {
let uniT={};
  uniT.health = health;
  uniT.type = type;
	if(type=="INFTR"){
  GameObject.call(this,uniT,'sprites/gry_circ.png',health ,posX, posY, owner);
	}else if(type=="CAVLRY"){
  GameObject.call(this,uniT,'sprites/gry_tri.png', health ,posX, posY, owner);
	}else if(type=="ARTLRY"){
  GameObject.call(this,uniT,'sprites/gry_sqr.png', health ,posX, posY, owner);
	}else{
  GameObject.call(this,uniT,'sprites/gry_wkr.png', health ,posX, posY, owner);
  }
return uniT;
};

function Resource (value, posX, posY) {
let resource={};
  GameObject.call(this,resource, "sprites/resources.png",value, posX, posY, "server");
  this.value = value;
resource.value=value;
return resource;
};

function Player(){
var user={}
user.resources=100;
user.alive=true;
user.workerRadius=2;

return user;
};
