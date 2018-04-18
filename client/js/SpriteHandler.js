function initAssets(){
	PIXI.loader.add("sprites/gry_circ.png");
	PIXI.loader.add("sprites/gry_sqr.png");
	PIXI.loader.add("sprites/gry_tri.png");
	PIXI.loader.add("sprites/gry_twr.png");
	PIXI.loader.add("sprites/gry_wall.png");
	PIXI.loader.add("sprites/resources.png");
	PIXI.loader.add("sprites/nickCage.png");
	PIXI.loader.add("sprites/radDec_bttn.png");
	PIXI.loader.add("sprites/radInc_bttn.png");
	PIXI.loader.add("sprites/buy_units_bttn.png");
}

function makeButtons(){
PIXI.loader.load(setUp);
	function setUp(){
	var tempBttn=new PIXI.Sprite(PIXI.loader.resources["sprites/buy_units_bttn.png"].texture);
	tempBttn.interactive=true;
	tempBttn.buttonMode=true;
	tempBttn.x=window.innerWidth-128;
	tempBttn.y=window.innerHeight-64;
	tempBttn.on("click",function(event){
	var pos={}
	pos.posX=dX;
	pos.posY=dY;
		socket.emit('unit-purchase-client', {type: 'soldier' , position: pos});//only handle soldiers for now
	});//buys a unit
	 app.stage.addChild(tempBttn);
tempBttn=new PIXI.Sprite(PIXI.loader.resources["sprites/radDec_bttn.png"].texture);
tempBttn.interactive=true;
	tempBttn.buttonMode=true;
	tempBttn.x=window.innerWidth-32;
	tempBttn.y=window.innerHeight-64;
	tempBttn.on("click",function(event){
		socket.emit('worker-radius-change-client' ,{ radius: player.workerRadius-1});
	});//decreases radius
	 app.stage.addChild(tempBttn);
tempBttn=new PIXI.Sprite(PIXI.loader.resources["sprites/radInc_bttn.png"].texture);
tempBttn.interactive=true;
	tempBttn.buttonMode=true;
	tempBttn.x=window.innerWidth-64;
	tempBttn.y=window.innerHeight-64;
	tempBttn.on("click",function(event){
		socket.emit('worker-radius-change-client' ,{ radius: player.workerRadius+1});
	});//increases radius
	 app.stage.addChild(tempBttn);

};
}


function getSprite(sprite, owner){
	PIXI.loader.load(setUp);
	function setUp(){
	this.sprite=new PIXI.Sprite(PIXI.loader.resources[sprite].texture);
		this.sprite.interactive=true;
		this.sprite.buttonMode=true;
if(player.name!=owner&&"server"!=owner){
	this.sprite.on("click",function(event){//add specific listeners
	highlight(event.target);
	});//Add mouse click listeners/actions to controlHandler
	}
	 app.stage.addChild(this.sprite);
return this.sprite;
	};
}

function getSpriteFromSheet(sprite, owner){//so far, just used for resoources ->no magic numbers yet
	PIXI.loader.load(setUp);
	function setUp(){
	PIXI.loader.resources[sprite].texture.frame=new PIXI.Rectangle((Math.random()*4)*16,(Math.random()*4)*16,16,16);
	var dispObjTemp=new PIXI.Sprite(PIXI.loader.resources[sprite].texture);
	 app.stage.addChild(dispObjTemp);
	};
}

function updateFromServer(objects){

}