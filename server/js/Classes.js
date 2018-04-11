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

