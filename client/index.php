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

  session_start();
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
    $sql = "SELECT * FROM users WHERE username = '$name'";
    $conn = db_connect();
    $result = $conn->query($sql);
    if($result->num_rows > 0) {
      $nameErr = "That username is already taken";
    } else {
      $sql = "INSERT INTO users (username, resources, worker_radius, stronghold_x, stronghold_y) VALUES ('$name', 500, 10, 0, 0)";
      if($conn->query($sql) === TRUE) {
        $_SESSION['username'] = $name;
        $session_name = $_SESSION['username'];
        header("Location: play.php");
      } else {
        die("Error in sending query!");
      }
    }
    $conn->close();
  }
?>
<html>
<head>
  <title>
    Welcome to Forts.io!
  </title>
  <style>
    body {
      width: 100%;
      height: 100%;
    }

    div {
      border: 1px solid;
    }

    div.ad-top, div.ad-bottom {
      width: 100%;
      height: 20%;
    }

    div.ad-left, div.ad-right {
      width: 20%;
      height: 60%;
    }

    div.center-box {
      width: 60%;
      height: 60%;
    }

    div.logo_div {
      width: 100%;
      height: 40%;
    }

    div.content_div {
      width: 100%;
      height: 60%;
    }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.7.1/pixi.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.0/socket.io.dev.js"></script>
</head>
<body>
  <div id="ad-top">
    <p>Ads Here</p>
  </div>
  <div id="ad-left">
    <p>Ads Here</p>
  </div>
  <div id="center-box">
    <div id="logo_div">

    </div>
    <div id="content_div">
      <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post">
        Username: <input type="text" name="username">&nbsp;
        <input type="submit">
      </form>
      <p style="color: red"><?php echo $nameErr?></p>
    </div>
  </div>
  <div id="ad-right">
    <p>Ads Here</p>
  </div>
  <div id="ad-bottom">
    <p>Ads Here</p>
  </div>
</body>
</html>
