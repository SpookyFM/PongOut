function blobEncoded(blob) {
    // Initialize the image upload
    var fd = new FormData(document.forms[0]);
    var xhr = new XMLHttpRequest();
        
    xhr.onreadystatechange=function()
      {
          if (xhr.readyState==4 && xhr.status==200)
        {
            // Navigate back to the list view
            window.location = "list.php";
        }
    }

    // Save all relevant variables
    var level = {"paddles": paddles, "balls": balls, "bricks": bricks};
    var json = JSON.stringify(level);
    
    // Upload the json as a file
    for (var i = 0; i < bricks.length; i++) {
        bricks[i].isSelected = undefined;
    }
    var jsonBlob = new Blob([json], {type: "text/json;charset=" + document.characterSet});
    
    fd.append("levelFile", jsonBlob);
    fd.append("preview", blob);
    fd.append("id", id);
    var theme = $( "#theme_selector" ).text();
    //alert(theme);
    fd.append("theme", theme);
    xhr.open('POST', 'uploadLevel.php', true);
    // TODO: Show a "busy" animation while the level is saving
    xhr.send(fd);
}

    
function saveLevel() {
    // First, encode the image as a blob
    canvas.toBlob(blobEncoded);        
}

    
