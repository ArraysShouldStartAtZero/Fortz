function getSprite(sprite, owner){
	PIXI.loader.add(sprite).load(setUp);
	function setUp(){
	var dispObjTemp=new PIXI.Sprite(PIXI.loader.resources[sprite].texture);
	//window.addEventListener("click",//////// ,false);//Add mouse click listerners/actions to controlHandler
	 app.stage.addChild(dispObjTemp);
	};
}
