function getSprite(sprite){
	PIXI.loader.add(sprite);
	this.sprite = new PIXI.Sprite(PIXI.loader.resources[sprite].texture);
}
