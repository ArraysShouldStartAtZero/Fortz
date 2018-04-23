<!DOCTYPE text/html>
<html>
<head>
  <title>
    Fortz.io
  </title>
  <style>
    body {margin: 0;}
    canvas {width: 100%; height: 100%;}
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.7.1/pixi.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.0/socket.io.dev.js"></script>
  <script src="js/Classes.js"></script>
  <script src="js/Game.js"></script>
  <script src="js/ControlHandler.js"></script>
  <script src="js/SpriteHandler.js"></script>
  <script src="js/SocketHandler.js"></script>
  <script src="js/MenuHandler.js"></script>
</head>
<body>
  <script>
    let username = "<?php echo $_SESSION['username'];?>";
    let app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight});
    document.body.appendChild(app.view);
    app.renderer.backgroundColor = 0x33cc33;
    app.renderer.autoResize = true;
    app.stage.interactiveChildren=true;
	let unitCont=new PIXI.Container();
	let structCont=new PIXI.Container();
	let uiCont=new PIXI.Container();
	let objCont=new PIXI.Container();
	objCont.addChild(unitCont);objCont.addChild(structCont);
	app.stage.addChild(uiCont);app.stage.addChild(objCont);
var workerCircle;
var but1,but2,but3,but4,but5,but6;
var cX=0, cY=0, dX=0,dY=0, dcX=0, dcY=0;//d is default camera position for recentering , c is current camera position
	initAssets();
	makeButtons();

//var nick= unit('nick',dX,dY,1,'sprites/nickCage.png','player');//add a sprite\

var player=Player();
	

    //Create socket handler and begin communication
    sock_handler_init(); 
	
//listeners for key presses 
function playerCamera_move(difX,difY){
	cX+=difX;cY+=difY;
	var i;
	for(i=0;i<objCont.children.length;i++){
		objCont.getChildAt(i).x-=difX;
		objCont.getChildAt(i).y-=difY;
	}
}

var changeInX=0, changeInY=0;

initListeners();

//app.ticker.speed=1/10;
app.ticker.add(delta => gameLoop(delta));

function gameLoop(delta){
	playerCamera_move(changeInX,changeInY);
}

  </script>
</body>
</html>