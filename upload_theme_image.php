<?php

function bytesToSize1024($bytes, $precision = 2) {
    $unit = array('B','KB','MB');
    return @round($bytes / pow(1024, ($i = floor(log($bytes, 1024)))), $precision).' '.$unit[$i];
}

$sFileName = $_FILES['image_file']['name'];
$sFileType = $_FILES['image_file']['type'];
$sFileSize = bytesToSize1024($_FILES['image_file']['size'], 1);

$themeId = $_POST['id'];
$imageName = $_POST['name'];

// Check if the folder for the theme exists

$filename = "themes/".$themeId."/".$imageName.".png";

if (move_uploaded_file($_FILES['image_file']['tmp_name'], $filename)) {
    echo <<<EOF
    <p>Your file: {$sFileName} has been successfully received.</p>
    <p>Type: {$sFileType}</p>
    <p>Size: {$sFileSize}</p>
    <p>Theme id: {$themeId}</p>
    <p>Image name: {$imageName}</p>
EOF;
}


?>