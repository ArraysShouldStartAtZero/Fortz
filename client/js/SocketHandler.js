//Make connection
socket = io.connect('http://ec2-18-218-106-24.us-east-2.compute.amazonaws.com:3000');

function sock_handler_init() {
  //Send hello message to server
  socket.on('hello-server', function(message) {
    console.log("The server said hello");
    socket.emit('hello-client', { username: "Peter Boilermaker" });
  });

  socket.on('position-server', function(pos) {
    console.log("Server says our position is: (" + pos.posX + ", " + pos.posY + ")");
  });
}
