<?php
// Get the theme id and the new name
$id = $_GET['id'];
$newName = $_GET['newName'];


include_once('config.php');


$mysqli = new mysqli(constant("DB_HOST"), constant("DB_USER"), constant("DB_PASSWORD"), constant("DB_NAME"));
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

// Rename the theme
$query = "UPDATE themes SET name='".$newName."' WHERE id='".$id."'";

$result = $mysqli->query($query);

if (!$result)
  {
  die("Error renaming theme: " . $mysqli->error());
  }



$mysqli->close();

echo $newName;
?>