function getSprite(sprite){
	PIXI.loader.add(sprite).load(setUp);
	function setUp(){
	 app.stage.addChild(new PIXI.Sprite(PIXI.loader.resources[sprite].texture));
	};
}
