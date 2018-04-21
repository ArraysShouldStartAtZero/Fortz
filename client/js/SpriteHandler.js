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
	PIXI.loader.add("sprites/buy_units_bttn_circ.png");
	PIXI.loader.add("sprites/buy_units_bttn_tri.png");
	PIXI.loader.add("sprites/Upgrade_bttn.png");
}

function makeButtons(){
PIXI.loader.load(setUp);
	function setUp(){
	but1=new PIXI.Sprite(PIXI.loader.resources["sprites/buy_units_bttn.png"].texture);
	but1.interactive=true;
	but1.buttonMode=true;
	but1.x=window.innerWidth-128;
	but1.y=window.innerHeight-64;
	but1.on("click",function(event){
	var pos={}
	pos.posX=dX;
	pos.posY=dY;
		socket.emit('unit-purchase-client', {type: 'soldier' , position: pos});//only handle soldiers for now
	});//buys a unit
	 app.stage.addChild(but1);
but2=new PIXI.Sprite(PIXI.loader.resources["sprites/radDec_bttn.png"].texture);
but2.interactive=true;
	but2.buttonMode=true;
	but2.x=window.innerWidth-32;
	but2.y=window.innerHeight-64;
	but2.on("click",function(event){
		socket.emit('worker-radius-change-client' ,{ radius: player.workerRadius-1});
	});//decreases radius
	 app.stage.addChild(but2);
but3=new PIXI.Sprite(PIXI.loader.resources["sprites/radInc_bttn.png"].texture);
but3.interactive=true;
	but3.buttonMode=true;
	but3.x=window.innerWidth-64;
	but3.y=window.innerHeight-64;
	but3.on("click",function(event){
		socket.emit('worker-radius-change-client' ,{ radius: player.workerRadius+1});
	});//increases radius
	 app.stage.addChild(but3);
but4=new PIXI.Sprite(PIXI.loader.resources["sprites/buy_units_bttn_circ.png"].texture);
but4.interactive=true;
	but4.buttonMode=true;
	but4.x=window.innerWidth-192;
	but4.y=window.innerHeight-64;
	but4.on("click",function(event){
	var pos={}
	pos.posX=dX;
	pos.posY=dY;
		socket.emit('unit-purchase-client', {type: 'calvary' , position: pos});
	});//purchase unit
	 app.stage.addChild(but4);
but5=new PIXI.Sprite(PIXI.loader.resources["sprites/buy_units_bttn_tri.png"].texture);
but5.interactive=true;
	but5.buttonMode=true;
	but5.x=window.innerWidth-256;
	but5.y=window.innerHeight-64;
	but5.on("click",function(event){
	var pos={}
	pos.posX=dX;
	pos.posY=dY;
		socket.emit('unit-purchase-client', {type: 'artillery' , position: pos});
	});//purchase unit
	 app.stage.addChild(but5);
but6=new PIXI.Sprite(PIXI.loader.resources["sprites/Upgrade_bttn.png"].texture);
but6.interactive=true;
	but6.buttonMode=true;
	but6.x=window.innerWidth-320;
	but6.y=window.innerHeight-64;
	but6.on("click",function(event){
		upgrade();
	});//upgrade unit
	 app.stage.addChild(but6);

};
}


function getSprite(sprite, owner, posX, posY){
	PIXI.loader.load(setUp);
	function setUp(){
	this.sprite=new PIXI.Sprite(PIXI.loader.resources[sprite].texture);
		this.sprite.interactive=true;
		this.sprite.buttonMode=true;
this.sprite.x=posX;
this.sprite.y=posY;
if((player.name!=owner&&"server"!=owner)||sprite=="sprites/gry_twr.png"||sprite=="sprites/gry_wall.png"){
	this.sprite.on("click",function(event){//add specific listeners
	highlight(event.target);
	});//Add mouse click listeners/actions to controlHandler
	}
	 app.stage.addChild(this.sprite);
return this.sprite;
	};
}

function getSpriteFromSheet(sprite, owner, posX, posY){
PIXI.loader.load(setUp);
	function setUp(){
	PIXI.loader.resources[sprite].texture.frame=new PIXI.Rectangle((Math.random()*4)*16,(Math.random()*4)*16,16,16);
	var dispObjTemp=new PIXI.Sprite(PIXI.loader.resources[sprite].texture);
	dispObjTemp.x=posX;
dispObjTemp.y=posY;
	 app.stage.addChild(dispObjTemp);
	};
}

function updateFromServer(objects){

}