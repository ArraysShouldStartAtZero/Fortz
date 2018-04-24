<?php
  $username = "";
  session_start();
  $username = $_SESSION['username'];
  if(isset($_SESSION['username'])) {
    $username = $_SESSION['username'];
  } else {
    header("Location: index.php");
  }

  function db_connect() {
    $servername = "localhost";
    $sqlname = "fortz_server";
    $password = "5%forNothing";
    $dbname = "world-data";
    $conn = new mysqli($servername, $sqlname, $password, $dbname);
    if($conn->connect_error) {
      die("Connection Failed: " . $conn->connect_error);
    }
    return $conn;
  }

  if($username != "") {
    $conn = db_connect();
    $sql = "SELECT * FROM users WHERE username = '$username'";
    $result = $conn->query($sql);
    if($result->num_rows <= 0) {
      header("Location: index.php");
    }
  } else {
    header("Location: index.php");
  }
?>
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
    var username = '<?php echo $username ;?>';
    console.log("Username: " + username);
    let app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight});
    document.body.appendChild(app.view);
    app.renderer.backgroundColor = 0x808080;
    app.renderer.autoResize = true;
    app.stage.interactiveChildren=true;
	let unitCont=new PIXI.Container();
	let structCont=new PIXI.Container();
	let background=new PIXI.Container();
	let uiCont=new PIXI.Container();
	let objCont=new PIXI.Container();
	objCont.addChild(unitCont);objCont.addChild(structCont);
	app.stage.addChild(background);app.stage.addChild(objCont);app.stage.addChild(uiCont);
	

var workerCircle=new PIXI.Sprite(PIXI.loader.resources["sprites/wrk_bnd.png"].texture);unitCont.addChild(workerCircle);
var counter=new PIXI.Text("Resources:"+69);uiCont.addChild(counter);
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
	background.x-=difX;
	background.y-=difY;
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
