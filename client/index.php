<?php
  function db_connect() {
    $servername = "localhost";
    $username = "fortz_server";
    $password = "5%forNothing";
    $dbname = "world-data";
    $conn = new mysqli($servername, $username, $password, $dbname);
    if($conn->connect_error) {
      die("Connection Failed: " . $conn->connect_error);
    }
    return $conn;
  }

  error_reporting(E_ALL);
  ini_set('display_errors', 1);
  $name = $nameErr = "";

  if($_SERVER["REQUEST_METHOD"] == "POST") {
    if(empty($_POST["username"])) {
      $nameErr = "Username is required";
    } else {
      $name = htmlspecialchars($_POST["username"]);
    }
  }
  if($name != "") {
    $sql = "SELECT * FROM users WHERE username = $name";
    $conn = db_connect();
    $conn->close();
  }
?>
<html>
<head>
  <title>
    Welcome to Forts.io!
  </title>
  <style>
    body {margin: 0;}
    canvas {width: 100%; height: 100%;}
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.7.1/pixi.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.0/socket.io.dev.js"></script>
</head>
<body>
  <h1>Welcome to Forts.io!</h1>
  <a href="play.html">Play Fortz.io</a>
  <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post">
    Username: <input type="text" name="username">&nbsp;
    <input type="submit">
  </form><br>
  <p style="color: red"><?php echo $nameErr?></p>
</body>
</html>
