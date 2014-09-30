<?php

// Get the level id from the request
$id = $_REQUEST["id"];

function deleteDir($path) {
    return is_file($path) ?
            @unlink($path) :
            array_map(__FUNCTION__, glob($path.'/*')) == @rmdir($path);
}

// Get the theme id from the request
$id = $_REQUEST["id"];

// Connect to the database
include_once('config.php');

$mysqli = new mysqli(constant("DB_HOST"), constant("DB_USER"), constant("DB_PASSWORD"), constant("DB_NAME"));
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

// Remove the level
$query = "DELETE FROM levels
	WHERE id = ".$id.";";
$result = $mysqli->query($query);
if (!$result)
{
  echo "Error removing theme: " . $mysqli->error();
}

// Delete the json file
deleteDir("levels/".$id.".json");

// Delete the preview
deleteDir("preview/".$id.".png");


$mysqli->close();



?>