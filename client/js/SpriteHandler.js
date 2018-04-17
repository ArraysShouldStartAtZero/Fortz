function getSprite(sprite, owner){
	PIXI.loader.add(sprite).load(setUp);
	function setUp(){
	this.sprite=new PIXI.Sprite(PIXI.loader.resources[sprite].texture);
		this.sprite.interactive=true;
		this.sprite.buttonMode=true;
	this.sprite.on("click",function(event){//add specific listeners
	highlight(event.target);
	
	});//Add mouse click listeners/actions to controlHandler
	
	 app.stage.addChild(this.sprite);
return this.sprite;
	};
}

function getSpriteFromSheet(sprite, owner){//so far, just used for resoources ->no magic numbers yet
	PIXI.loader.add(sprite).load(setUp);
	function setUp(){
	PIXI.loader.resources[sprite].texture.frame=new PIXI.Rectangle((Math.random()*4)*16,(Math.random()*4)*16,16,16);
	var dispObjTemp=new PIXI.Sprite(PIXI.loader.resources[sprite].texture);
	 app.stage.addChild(dispObjTemp);
	};
}

function updateFromServer(objects){

}