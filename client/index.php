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
      margin: 0;
      padding: 0;
      background-color: #828282;
      color: #e5e5e5;
    }

    div {
      vertical-align: top;
    }

    div#ad_top {
      width: 100%;
      height: 20%;
    }

    div#ad_bottom {
      width: 100%;
      height: 20%;
      display: inline-block;
    }

    div#ad_left {
      width: 20%;
      height: 60%;
      display: inline-block;
    }

    div#ad_right {
      width: 20%;
      height: 60%;
      display: inline-block;
    }

    div#center_box {
      width: 60%;
      height: 60%;
      display: inline-block;
    }

    div#logo_div {
      width: 100%;
      height: 40%;
      text-align: center;
    }

    div#content_div {
      width: 100%;
      height: 60%;
    }

    form#the_form {
      margin-top: 15%;
    }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.7.1/pixi.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.0/socket.io.dev.js"></script>
</head>
<body>
  <div id="ad_top">
    <p>&nbsp;</p>
  </div><div id="ad_left">
    <p>&nbsp;</p>
  </div><div id="center_box">
    <div id="logo_div">
      <h1>Welcome to Fortz.io</h1>
    </div>
    <div id="content_div">
      <form id="the_form" align="center" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post">
        Username: <input type="text" name="username">&nbsp;
        <input type="submit">
      </form>
      <p style="color: red"><?php echo $nameErr?></p>
    </div>
  </div><div id="ad_right">
    <p>&nbsp;</p>
  </div><div id="ad_bottom">
    <p>&nbsp;</p>
  </div>
</body>
</html>
