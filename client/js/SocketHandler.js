//Make connection

socket = io.connect('http://ec2-18-218-106-24.us-east-2.compute.amazonaws.com:3000');



var spriteChangeCtr = 0;



function sock_handler_init() {

  //Send hello message to server

  socket.on('hello-server', function(message) {

    console.log("The server said hello");

    socket.emit('hello-client', { username: username });
    console.log("Username: " + username);
  });



  socket.on('fort-placement-server', function(pos){//set fort parts spawn and camera start location and bkgrnd

    //console.log("Server says our position is: (" + pos.posX + ", " + pos.posY + ")");

	dX=pos.posX*64;
	dcX=dX-window.innerWidth/4;
	dY=pos.posY*64;
	dcY=dY-window.innerHeight/4;
	cX=dcX;cY=dcY;

	tileBkGrnd();

});



  socket.on('update-server',function(objects){//update object locations to stage from server

console.log("Got update!");

if(spriteChangeCtr >= 5) {

  spriteChangeCtr = 0;

  spriteNum++;

  if(spriteNum >= 16) spriteNum = 0;

}

spriteChangeCtr++;

updateChanged(objects);
adjustRadius(player.workerRadius);

objs=objects;

//resourceCounter();

});



socket.on('user-unknown-server', function(message){
  window.location.reload(true);   
});



 socket.on('player-update-server',function(playerData){//player-detail specific updates from server

player.resources=playerData.resources;

player.workerRadius=playerData.workerRadius;

player.targets=playerData.targets;

resourceCounter();
//adjustRadius(player.workerRadius);



});



  socket.on('game-over-server',function(message){//display gameover-tryagain for player

	gameOver();

});



}
