<?php


    $uploaddirLevel = $_SERVER['DOCUMENT_ROOT'].'/levels/';
    $uploadfileLevel = $uploaddirLevel . $_POST['id'] . '.json';


    $uploaddirPreview = $_SERVER['DOCUMENT_ROOT'].'/preview/';
    $uploadfilePreview = $uploaddirPreview . $_POST['id'] . '.png';

    $id = $_POST['id'];

    
    if (move_uploaded_file($_FILES['levelFile']['tmp_name'], $uploadfileLevel)) {
    } else {
        die("Error moving file.");
    }

    if (move_uploaded_file($_FILES['preview']['tmp_name'], $uploadfilePreview)) {
    } else {
        die("Error moving file.");
    }


    // Save the theme
    include_once('config.php');

    $mysqli = new mysqli(constant("DB_HOST"), constant("DB_USER"), constant("DB_PASSWORD"), constant("DB_NAME"));
    if ($mysqli->connect_errno) {
        echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    }


    // Get the theme id
    $theme = $_POST['theme'];
    $query = "SELECT id FROM `themes` WHERE name = '".$theme."'";

    $result = $mysqli->query($query);

    $result->data_seek(0);
    $row = $result->fetch_assoc();
    
    $theme_id = $row['id'];



    // Change the theme id
    $query = "UPDATE `levels` SET `theme` = '".$theme_id."' WHERE `levels`.`id` = ".$id.";";
    
    $result =  $result = $mysqli->query($query);
    
    $mysqli->close();
    

?>