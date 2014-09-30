<?php

// Connect to the database
include_once('config.php');

$mysqli = new mysqli(constant("DB_HOST"), constant("DB_USER"), constant("DB_PASSWORD"), constant("DB_NAME"));
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

// Create a new unnamed level
$query = "INSERT INTO levels (name) VALUES
    ('Unnamed level')";

$result = $mysqli->query($query);
if (!$result)
{
  echo "Error creating level: " . $mysqli->error();
}



// Redirect to the unnamed theme
$id = $mysqli->insert_id;


$mysqli->close();

header("Location: edit.php?id=".$id);
exit();

?>