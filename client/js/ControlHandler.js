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
let w=Keyboard(87);//w
	let a=Keyboard(65);//a
	let s=Keyboard(83);//s
	let d=Keyboard(68);//d
    w.press = () => {
	changeInY=-5;
	};
	a.press = () => {
	changeInX=-5;
	};
	s.press = () => {
	changeInY=5;
	};
	d.press = () => {
	changeInX=5;
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

}

