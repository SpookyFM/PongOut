<?php
// Get the id
$id = $_GET['id'];


// Connect to the database
include_once('config.php');

$mysqli = new mysqli(constant("DB_HOST"), constant("DB_USER"), constant("DB_PASSWORD"), constant("DB_NAME"));
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$query = "SELECT name FROM themes WHERE id='".$id."'";
$result = $mysqli->query($query);

if (!$result)
{
  die("Error loading level name: " . $mysqli->error);
}


$row = $result->fetch_assoc();
$name = $row['name'];   

$mysqli->close();

?>



<html lang="en">
<head>
<meta charset="utf-8" />
<title>
PongOut - <?php echo $name ?>
</title>
    
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="../../assets/js/html5shiv.js"></script>
      <script src="../../assets/js/respond.min.js"></script>
    <![endif]-->
    
<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.1/themes/base/jquery-ui.css" />
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="http://code.jquery.com/ui/1.10.1/jquery-ui.js"></script>
    
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <!-- <script src="//code.jquery.com/jquery.js"></script> -->
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    
    
<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.1/themes/base/jquery-ui.css" />
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="http://code.jquery.com/ui/1.10.1/jquery-ui.js"></script>
<link href="css/upload.css" rel="stylesheet" type="text/css" />
<script src="js/Upload.js"></script>


    
<script>
function uploadFinished() {
    d = new Date();
    $("#bg_preview").attr("src", "themes/<?php echo $id; ?>/bg.png?"+d.getTime());
    $("#ball_preview").attr("src", "themes/<?php echo $id; ?>/ball.png?"+d.getTime());
    $("#brick_preview").attr("src", "themes/<?php echo $id; ?>/brick.png?"+d.getTime());
    $("#paddle_preview").attr("src", "themes/<?php echo $id; ?>/paddle.png?"+d.getTime());
}
    
    
$(function() {
    $("img").error(function () {
        $(this).attr("src", "images/broken.jpg");
    });
    
    var form_bg = registerUploadForm($("#upload_form_bgimage"), "<?php echo $id; ?>", "bg");
    form_bg.uploadFinished = uploadFinished;
    var form_ball = registerUploadForm($("#upload_form_ball"), "<?php echo $id; ?>", "ball");
    form_ball.uploadFinished= uploadFinished;
    var form_brick = registerUploadForm($("#upload_form_brick"), "<?php echo $id; ?>", "brick");
    form_brick.uploadFinished = uploadFinished;
    var form_paddle = registerUploadForm($("#upload_form_paddle"), "<?php echo $id; ?>", "paddle");
    form_paddle.uploadFinished = uploadFinished;
    
});
</script>
<script>
$(function() {
    // Set up tooltips
    $( document ).tooltip();
    
    // Set up the dialog to open
    $('#titleDiv').click(function() {
        $( "#dialog-modal" ).dialog( "open" );
    });
	
    // Set up the dialog
    $( "#dialog-modal" ).dialog({
	       height: 250,
            autoOpen: false,
	       modal: true,
           position: { my: 'top', at: 'top+150' },
           buttons: {
            "OK": function() {
                // Get the id and the new name
                var id = <?php echo $id ?>;
                var newName = $('#newName').val();
                var xhr = new XMLHttpRequest();

                xhr.onreadystatechange=function()
                {
                    if (xhr.readyState==4 && xhr.status==200)
                    {
                        // Change the title
                        document.title = xhr.responseText;
                        $('#titleDiv').text(xhr.responseText);
                    }   
                  }

                xhr.open("GET","rename_theme.php?id="+id+"&newName="+newName,true);
                xhr.send();
                $( this ).dialog( "close" );
                },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
	       }
        });
     
});
    
</script>

</head>
<body>



<nav class="navbar navbar-default" role="navigation">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="list.php">PongOut</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li><a href="list.php">Levels</a></li>
        <li><a href="list_themes.php">Themes</a></li>
        <li><div id="titleDiv" style="font-weight:bold" class="navbar-text"  title="Click to change name"><b><?php echo $name; ?></b></div></li> 
      </ul>
        
        
        
    </div><!-- /.navbar-collapse -->
    
  </div><!-- /.container-fluid -->
</nav>
    
    
<h3>Background image:</h3>
<p>Suggested file size: 1024x767 pixels. The image will be scaled to this size.</p>
<img width=200 id="bg_preview" src="themes/<?php echo $id; ?>/bg.png" />
<br/>
<div id="upload_form_bgimage"></div>

<h3>Ball image:</h3>
<p>Suggested file size: 20x20 pixels. The image will be scaled to this size.</p>
<img id="ball_preview" width="24" src="themes/<?php echo $id; ?>/ball.png" />
<div id="upload_form_ball"></div>

    
<h3>Brick image:</h3>    
<p>Suggested file size: 20x80 pixels. The image will be scaled to this size.</p>
<img id="brick_preview" width="30" height="120" src="themes/<?php echo $id; ?>/brick.png" />
<div id="upload_form_brick"></div>
    
<h3>Paddle image:</h3>    
<p>Suggested file size: 50x150 pixels. The image will be scaled to this size.</p>
<p>Please upload the paddle for the right player, the left player's paddle will have the same image mirrored.</p>
<img id="paddle_preview" width="24" height="128" src="themes/<?php echo $id; ?>/paddle.png" />
<div id="upload_form_paddle"></div>
  
<!-- The rename level dialogue -->
<div id="dialog-modal" title="Rename theme">
    <div>Enter a new theme name</div>
    <form>
        <input type="text" name="newName" id="newName" value="<?php echo $name; ?>"  />
    </form>
</div> 
    
</body>
</html>