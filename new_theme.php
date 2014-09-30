<?php
// Connect to the database
include_once('config.php');

$mysqli = new mysqli(constant("DB_HOST"), constant("DB_USER"), constant("DB_PASSWORD"), constant("DB_NAME"));
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

// Create a new unnamed theme
$query = "INSERT INTO themes (name) VALUES
    ('New theme')";
$result = $mysqli->query($query);
if (!$result)
{
  echo "Error creating theme: " . $mysqli->error();
}



// Redirect to the unnamed theme
$id = $mysqli->insert_id;

// Make a directory for the theme
mkdir("themes/".$id);

$mysqli->close();

header("Location: edit_theme.php?id=".$id);
exit();
?>