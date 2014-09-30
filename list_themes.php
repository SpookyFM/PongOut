<html>
<head>
<title>PongOut - List Themes</title>
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
    
    
<script>
var rowToDelete;    
    
$(function() {
    
    
	// Set up the dialog
    $( "#dialog-delete" ).dialog({
	       height: 250,
            autoOpen: false,
	       modal: true,
           buttons: {
            "OK": function() {
                // Get the id 
                
                var xhr = new XMLHttpRequest();

                xhr.onreadystatechange=function()
                {
                    if (xhr.readyState==4 && xhr.status==200)
                    {
                        // Hide the table row
                        $("#theme"+rowToDelete).fadeOut();

                        // TODO: How to handle an error?
                    }   
                  }

                xhr.open("GET","delete_theme.php?id="+rowToDelete,true);
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
      <a class="navbar-brand" href="#">PongOut</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li><a href="list.php">Levels</a></li>
        <li class="active"><a href="list_themes.php">Themes</a></li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
    

<div class="container">
        <div style="margin: 0 auto; max-width: 700px">
    
<?php

include_once('config.php');


$mysqli = new mysqli(constant("DB_HOST"), constant("DB_USER"), constant("DB_PASSWORD"), constant("DB_NAME"));
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$query="SELECT * FROM themes";
$result = $mysqli->query($query);

$num = $result->num_rows;
$mysqli->close();

$i = 0;
while ($i < $num) {
    
    $result->data_seek($i);
    $row = $result->fetch_assoc();
    
    $id     = $row['id'];
    $output = $row['name'];
?>
    
    
    
<div class="panel panel-default" id="theme<?php echo $id; ?>">
        <div class="panel-heading">
            <h3 class="panel-title"><?php echo $output; ?></h3>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-xs-6 text-left">
                    <img width="120" src="themes/<?php echo $id ?>/bg.png" />
                    <img width="30" src="themes/<?php echo $id ?>/ball.png" />
                    <img width="30" src="themes/<?php echo $id ?>/brick.png" />
                    <img width="30" src="themes/<?php echo $id ?>/paddle.png" />
                </div>
                <div class="col-xs-6 text-right">
                    <p><a href='edit_theme.php?id=<?php echo $id; ?>' class="btn btn-primary">Edit</a></p>
                    <p><a href='list_themes.php' class="btn btn-danger" onclick='deleteRow(<?php echo $id; ?>);return false;'>Delete</a></p>
                </div>
            </div>
        </div>
    </div>
    

    
    
<?php
    $i++;
} ?>
    
    
    <form action='new_theme.php' method='GET' class="text-right">
        <input type='submit' class="btn btn-primary" name='do' value='Create new theme'/>
    </form>
    </div>
</div>    
    
    

    

    
<script>
    function deleteRow(row) {
        rowToDelete = row;
        
        // Show the dialog
        $("#dialog-delete").dialog("open");
    }
</script>
    
    
<div id="dialog-delete" title="Delete level">
    <div>Are you sure you wish to delete this theme?</div>
</div> 
    
</body>
</html>
