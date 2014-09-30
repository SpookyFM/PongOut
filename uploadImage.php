<?php
    $uploaddirLevel = $_SERVER['DOCUMENT_ROOT'].'/preview/';
    $uploadfile = $uploaddir . $_POST['id'] . '.png';

    
    
    echo '<pre>';
    if (move_uploaded_file($_FILES['myFile']['tmp_name'], $uploadfile)) {
        
    } else {
        die("Error moving file.");
    }
?>