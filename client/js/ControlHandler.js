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
let space = Keyboard(32);//space for camera recentering
	space.press = () => {
	var i;
	var qwertyX=dcX-cX;
	var qwertyY=dcY-cY;
	for(i=0;i<objCont.children.length;i++){
		objCont.getChildAt(i).x-=qwertyX;
		objCont.getChildAt(i).y-=qwertyY;
	}
	
	background.x-=qwertyX;
	background.y-=qwertyY;
	cX=dcX;
	cY=dcY;
	};

}

function upgrade(){
if(highlighted){
socket.emit('object-upgrade-client' ,{ ID: 0 });//implement when all other basics are done
highlighted=false;
upgradable =false;
}else{
upgradable=true;
highlighted=false;
}
}

function highlight(obj){
var temp=getByLoc(obj.x,obj.y);
if(upgradable===true){
socket.emit('object-upgrade-client' ,{ object_id: temp.id });
upgradable =false;
highlighted=false;
}else{
if(username===obj.owner&&(obj.type==='WALL'||obj.type==='TOWER')){
highlighted=true;
}else{
console.log("sent target");
socket.emit('target-object-client', { object_id: temp.id });
highlighted=false;
}
}
}

