var highlighted=false;
var upgradable=false;


//plagarized from PIXI tutorial
function Keyboard( keyCode ){
 let key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };
  //The `upHandler`
  key.upHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

function initListeners(){
var moveSpd=5;

let w=Keyboard(87);//w
	let a=Keyboard(65);//a
	let s=Keyboard(83);//s
	let d=Keyboard(68);//d
    w.press = () => {
	changeInY=-moveSpd;
	};
	a.press = () => {
	changeInX=-moveSpd;
	};
	s.press = () => {
	changeInY=moveSpd;
	};
	d.press = () => {
	changeInX=moveSpd;
	};
   w.release = () => {
	if(s.isUp){
	changeInY=0;
	}
	};
	a.release = () => {
	if(d.isUp){
	changeInX=0;
	}
	};
	s.release = () => {
	if(w.isUp){
	changeInY=0;
	}
	};
	d.release = () => {
	if(a.isUp){
	changeInX=0;
	}
	};
let shift = Keyboard(16);//shift for mov speed
	shift.press = () => {
	moveSpd=10;
	};
   	shift.release = () => {
	moveSpd=5;
	};
let space = Keyboard(32);//shift for mov speed
	space.press = () => {
	var i;
	var qwertyX=dX-cX;
	var qwertyY=dY-cY;
	for(i=0;i<app.stage.children.length-6;i++){
		app.stage.getChildAt(i).x+=qwertyX;
		app.stage.getChildAt(i).y+=qwertyY;
	}
	cX=dX;
	cY=dY;
	};

}

function upgrade(){
//if(highlighted){
socket.emit('object-upgrade-client' ,{ ID: 0 });
//}else{
//upgradable=true;
//}
}

function highlight(obj){
//if(!highlighted){
//obj.x+=10;
//highlighted=true;
//}else{
var tempID=getIdByLoc(obj.x,obj.y);
socket.emit('target-object-client', { object_id: tempID });
//}
}

