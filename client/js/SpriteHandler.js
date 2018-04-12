function getSprite(sprite){
	PIXI.loader.add(sprite);
	return new PIXI.Sprite(PIXI.loader.resources[sprite].texture); 
}
