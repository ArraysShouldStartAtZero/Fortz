function getSprite(sprite, owner){
	PIXI.loader.add(sprite).load(setUp);
	function setUp(){
	var dispObjTemp=new PIXI.Sprite(PIXI.loader.resources[sprite].texture);
	//window.addEventListener("click",//////// ,false);//Add mouse click listerners/actions to controlHandler
	 app.stage.addChild(dispObjTemp);
	};
}

function getSpriteFromSheet(sprite, owner){//so far, just used for resoources ->no magic numbers yet
	PIXI.loader.add(sprite).load(setUp);
	function setUp(){
	PIXI.loader.resources[sprite].texture.frame=new Rectangle(randomInt(0,3)*16,randomInt(0,3)*16,16,16);
	var dispObjTemp=new PIXI.Sprite(PIXI.loader.resources[sprite].texture);
	//window.addEventListener("click",//////// ,false);//Add mouse click listerners/actions to controlHandler
	 app.stage.addChild(dispObjTemp);
	};
}