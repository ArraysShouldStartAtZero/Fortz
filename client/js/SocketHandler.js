//Make connection
socket = io.connect('http://ec2-18-218-106-24.us-east-2.compute.amazonaws.com:3000');

function sock_handler_init() {
  //Send hello message to server
  socket.on('hello-server', function(message) {
    console.log("The server said hello");
    socket.emit('hello-client', { username: "Pete Boilermaker" });
  });

  socket.on('fort-placement-server', function(pos){//spawn fort parts and camera start location
    //console.log("Server says our position is: (" + pos.posX + ", " + pos.posY + ")");
	dX=pos.posX*64;
	dY=pos.posY*64;
	cX=dX;cY=dY;
	
});

  socket.on('update-server',function(objects){//update object locations to stage from server
console.log("Got update!");
if(app.satge.children.length-1>6){
app.stage.removeChildren(6,app.stage.children.length-1);
}
objs=objects;
var i;
for(i=0;i<objects.length;i++){
addGameObject(objects[i].type,objects[i].id,objects[i].pos_x,objects[i].pos_y,objects[i].health,objects[i].owner);
}
resourceCounter();
});

 socket.on('user-unknown-server',function(){});

 socket.on('player-update-server',function(playerData){//player-detail specific updates from server
player.resources=playerData.resources;
player.workerRadius=playerData.workerRadius;
player.targets=playerData.targets;

});

  socket.on('game-over-server',function(message){//display gameover-tryagain for player
	gameOver();
});

}
