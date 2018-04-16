//Make connection
socket = io.connect('http://ec2-18-218-106-24.us-east-2.compute.amazonaws.com:3000');

function sock_handler_init() {
  //Send hello message to server
  socket.on('hello-server', function(message) {
    console.log("The server said hello");
    socket.emit('hello-client', { username: "Peter Boilermaker" });
  });

  socket.on('fort-placement-server', function{//spawn fort parts and camera start location
	
});

  socket.on('update-server',function{//update object locations to stage from server

});
 socket.on('player-update-server',function{//player-detail specific updates from server

});

  socket.on('position-server', function(pos) {
    console.log("Server says our position is: (" + pos.posX + ", " + pos.posY + ")");
  });
}
