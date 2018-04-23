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
	PIXI.loader.add("sprites/wrk_bnd.png");
	PIXI.loader.add("sprites/gry_strghd.png");
	PIXI.loader.add("sprites/gry_wkr.png");
	PIXI.loader.add("sprites/damage.png");
	PIXI.loader.add("sprites/grass.png");
}

function tileBkGrnd(){
PIXI.loader.load(setUp);
	function setUp(){
	for(var i=0;i<32;i++){
	for(var j=0;j<32;j++){
		var sprt=new PIXI.Sprite(PIXI.loader.resources["sprites/grass.png"].texture);
		sprt.x=i*256;
		sprt.y=j*256;
		background.addChild(sprt);
	}
	}
};
}

function healthDisplay( hp, x, y, units){
PIXI.loader.load(setUp);
	function setUp(){
	var txt=PIXI.loader.resources["sprites/buy_units_bttn.png"].texture;
	if(hp<=25){
	txt.frame=new PIXI.Rectangle(64,64,64,64);
	}else if(hp<=50){
	txt.frame=new PIXI.Rectangle(0,64,64,64);
	}else if(hp<=75){
	txt.frame=new PIXI.Rectangle(64,0,64,64);
	}else{
	txt.frame=new PIXI.Rectangle(0,0,64,64);
	}
	var dmg=new PIXI.Sprite(txt);
	dmg.x=x;
	dmg.y=y;
	dmg.width=64*units;
	dmg.height=64*units;	
//	strctCont.addChild(dmg);
return dmg;
};
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
	pos.posX=dX/64;
	pos.posY=dY/64-1;
		socket.emit('unit-purchase-client', {type: 'ARTLRY' , position: pos});//only handle soldiers for now
	});//buys a unit
	 uiCont.addChild(but1);
but2=new PIXI.Sprite(PIXI.loader.resources["sprites/radDec_bttn.png"].texture);
but2.interactive=true;
	but2.buttonMode=true;
	but2.x=window.innerWidth-32;
	but2.y=window.innerHeight-64;
	but2.on("click",function(event){
		socket.emit('worker-radius-change-client' ,{ radius: player.workerRadius-1});
	});//decreases radius
	 uiCont.addChild(but2);
but3=new PIXI.Sprite(PIXI.loader.resources["sprites/radInc_bttn.png"].texture);
but3.interactive=true;
	but3.buttonMode=true;
	but3.x=window.innerWidth-64;
	but3.y=window.innerHeight-64;
	but3.on("click",function(event){
		socket.emit('worker-radius-change-client' ,{ radius: player.workerRadius+1});
	});//increases radius
	 uiCont.addChild(but3);
but4=new PIXI.Sprite(PIXI.loader.resources["sprites/buy_units_bttn_circ.png"].texture);
but4.interactive=true;
	but4.buttonMode=true;
	but4.x=window.innerWidth-192;
	but4.y=window.innerHeight-64;
	but4.on("click",function(event){
	var pos={}
	pos.posX=dX/64;
	pos.posY=dY/64-1;
		socket.emit('unit-purchase-client', {type: 'INFNTR' , position: pos});
	});//purchase unit
	 uiCont.addChild(but4);
but5=new PIXI.Sprite(PIXI.loader.resources["sprites/buy_units_bttn_tri.png"].texture);
but5.interactive=true;
	but5.buttonMode=true;
	but5.x=window.innerWidth-256;
	but5.y=window.innerHeight-64;
	but5.on("click",function(event){
	var pos={}
	pos.posX=dX/64;
	pos.posY=dY/64-1;
		socket.emit('unit-purchase-client', {type: 'CAVLRY' , position: pos});
	});//purchase unit
	 uiCont.addChild(but5);
but6=new PIXI.Sprite(PIXI.loader.resources["sprites/Upgrade_bttn.png"].texture);
but6.interactive=true;
	but6.buttonMode=true;
	but6.x=window.innerWidth-320;
	but6.y=window.innerHeight-64;
	but6.on("click",function(event){
		upgrade();
	});//upgrade unit
	 uiCont.addChild(but6);

};
}

function adjustRadius(rad){
PIXI.loader.load(setUp);
	function setUp(){//default
	workerCircle=new PIXI.Sprite(PIXI.loader.resources["sprites/wrk_bnd.png"].texture);
	workerCircle.width=rad*128;
	workerCircle.height=rad*128;
	workerCircle.anchor.x=0.5;
	workerCircle.anchor.y=0.5;
	workerCircle.x=dX+224;
	workerCircle.y=dY+224;
structCont.addChild(workerCircle);
};
}


function getSprite(sprite, owner, posX, posY, hp){
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
	});
	}
if(sprite=="sprites/gry_twr.png"||sprite=="sprites/gry_wall.png"){
this.sprite.mask=healthDisplay(hp, posX, posY, 1);
structCont.addChild(this.sprite);
}else if(sprite=="sprites/gry_strghd.png"){ 
this.sprite.mask=healthDisplay(hp, posX, posY, 9);
structCont.addChild(this.sprite);
}else{
unitCont.addChild(this.sprite);
}
	 
return this.sprite;
	};
}

var spriteNum = 0;

function getSpriteFromSheet(sprite, owner, posX, posY){
PIXI.loader.load(setUp);
	function setUp(){
	PIXI.loader.resources[sprite].texture.frame=new PIXI.Rectangle((spriteNum%4)*16,Math.floor(spriteNum/4)*16,16,16);
	var dispObjTemp=new PIXI.Sprite(PIXI.loader.resources[sprite].texture);
	dispObjTemp.x=posX;
dispObjTemp.y=posY;
	 unitCont.addChild(dispObjTemp);
	};
}

function updateFromServer(objects){

}
