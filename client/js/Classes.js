function GameObject (object,sprite, posX, posY,owner) {
if(sprite=="sprites/resources.png"){
object.sprite = getSpriteFromSheet(sprite,owner);
}else{
  object.sprite = getSprite(sprite,owner);
}  
object.posX = posX;
  object.posY = posY;
object.owner=owner;
};

function Structure (type, posX, posY, health, sprite, owner) {
 let struct={};
 GameObject.call(this,struct, sprite, posX, posY, owner);
 struct.health = health;
  struct.type = type;
return struct;
};

function unit (type, posX, posY, health, sprite, owner) {
let uniT={};
  uniT.health = health;
  uniT.type = type;
  GameObject.call(this,uniT,sprite, posX, posY, "server");
return uniT;
};

function Resource (value, posX, posY) {
let resource={};
  GameObject.call(this,resource, "sprites/resources.png", posX, posY, "server");
  this.value = value;
resource.value=value;
return resource;
};

function Fort(posX, posY, user){
  Structure("tower",posX,posY,100,"sprites/gry_twr.png",user);
   Structure("wall",posX, posY+64,100,"sprites/gry_wall.png",user);
 Structute("tower",posX,posY+128,100,"sprites/gry_twr.png",user);
  Structure("wall",posX+64, posY,100,"sprites/gry_wall.png",user);
new Structure("tower",posX+128,posY,100,"sprites/gry_twr.png",user);
  new Structure("wall",posX+128, posY+64,100,"sprites/gry_wall.png",user);
  Structure("tower",posX+128,posY+128,100,"sprites/gry_twr.png",user);
 Structure("wall",posX+64, posY+128,100,"sprites/gry_wall.png",user);
  
};

function Player(){
var user={}
user.resources=100;
user.alive=true;
user.workerRadius=2;

return user;
};
