//Make connection
socket = io.connect('http://ec2-18-218-106-24.us-east-2.compute.amazonaws.com:3000');

function sock_handler_init() {
  //Send hello message to server
  socket.on('hello-server', function(message) {
    console.log("The server said hello");
    socket.emit('hello-client', { username: "Peter Boilermaker" });
  });

  socket.on('fort-placement-server', function(pos){//spawn fort parts and camera start location
    //console.log("Server says our position is: (" + pos.posX + ", " + pos.posY + ")");
	dX=pos.posX;
	dY=pos.posY;
	spawnPlayer(dX,dY);
});

  socket.on('update-server',function(objects){//update object locations to stage from server
app.stage.removeChildren();
val i;
for(i=0;i<objects.length;i++){
addGameObject(objects[i].type,objects[i].uid,objects[i].posX,objects[i].posY,objects[i].health,objects[i].owner);
}

});

 socket.on('user-unknown-server',function(){});

 socket.on('player-update-server',function(){//player-detail specific updates from server

});

  socket.on('game-over-server',function(){//display gameover-tryagain for player

});

}
