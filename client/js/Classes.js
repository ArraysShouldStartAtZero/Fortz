function GameObject (sprite, posX, posY) {
  this.sprite = SpriteHandler.getSprite(sprite);
  this.posX = posX;
  this.posY = posY;
}

function Structure (type, posX, posY, health, sprite, owner) {
  GameObject.call(this, sprite, posX, posY);
  this.health = health;
  this.type = type;
}

function Unit (type, posX, posY, health, sprite, owner) {
  GameObject.call(this, sprite, posX, posY);
  this.health = health;
  this.type = type;
}

function Resource (value, posX, posY) {
  GameObject.call(this, "//RESOURCE SPRITE HERE", posX, posY);
  this.value = value;
}

function Player (posX, posY, alive, resources){
this.posX=posX;
this.posY=posY;
this.alive=alive;
this.resources=resources;

}

function Fort(posX, posY, user){
  val tow1=new Structure("tower",posX,posY,100,"sprites/gry_twr.png",user);
  val wal1= new Structure("wall",posX, posY+64,100,"sprites/gry_wall.png",user);
  val tow2=new Structute("tower",posX,posY+128,100,"sprites/gry_twr.png",user);
  val wal2= new Structure("wall",posX+64, posY,100,"sprites/gry_wall.png",user);
  val tow3=new Structute("tower",posX+128,posY,100,"sprites/gry_twr.png",user);
  val wal3= new Structure("wall",posX+128, posY+64,100,"sprites/gry_wall.png",user);
  val tow4=new Structute("tower",posX+128,posY+128,100,"sprites/gry_twr.png",user);
  val wal4= new Structure("wall",posX+64, posY+128,100,"sprites/gry_wall.png",user);
  val keep;
}

