<html>
<head>
</head>

<body>
    
<h1>Installing PongOut</h1>
<p>This page will help you in installing PongOut. See below for the step you are currently working on:</p>

<?php 

include_once('config.php');


$mysqli = new mysqli(constant("DB_HOST"), constant("DB_USER"), constant("DB_PASSWORD"), constant("DB_NAME"));
if ($mysqli->connect_errno) {
    $errno = $mysqli->errno;
    
    if ($errno == 1045) {
        echo("<p>No connection could be made. Please use a text editor to open config.php in the folder where you installed PongOut and follow the instructions there.</p>");
    } else {
        echo("<p>Something has gone wrong while connecting to the database server. Please see the SQL error message below:</p>");
        echo( $mysqli->error);
        echo($errno);
    }
    
    die();
}

// Create the table for levels
$query = "CREATE TABLE IF NOT EXISTS `levels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `notes` text,
  `data` blob,
  `theme` int(11),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;";

$result = $mysqli->query($query);
if ($result)
  {
  echo "Levels table created.<br/>";
  }
else
  {
  echo "Error creating levels table: " .  $mysqli->error;
  }


  // Create the table for the themes
$query = "CREATE TABLE IF NOT EXISTS `themes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;";



$result = $mysqli->query($query);
if ($result)
  {
  echo "Themes database created.<br/>";
  }
else
  {
  echo "Error creating themes table: " . $mysqli->error;
  }

  $query = "INSERT INTO `po_db`.`themes` (`id`, `name`) VALUES (NULL, 'Default');";
 $result = $mysqli->query($query);
if ($result)
  {
  echo "Default theme inserted.<br/>You can now navigate to the <a href='list.php'>list</a> of levels and start building levels!";
  }
else
  {
  echo "Error creating table: " . $mysqli->error;
  }








?>

</body>
</html>
