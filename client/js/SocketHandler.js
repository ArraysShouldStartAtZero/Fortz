function SocketHandler() {
  //Make connection
  this.socket = io.connect('http://localhost:3000');

  this.init = function() {
    //Send hello message to server
    //Wait for response
    //Blah, blah
  }
}
