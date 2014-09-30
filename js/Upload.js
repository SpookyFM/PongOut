// common variables
var iBytesUploaded = 0;
var iBytesTotal = 0;
var iPreviousBytesLoaded = 0;
var iMaxFilesize = 1048576; // 1MB
var oTimer = 0;
var sResultFileSize = '';


UploadForm.prototype.findElement = function(id){
    return this.$parent.find("."+id).get(0);
};


function UploadForm(parent, id, name){
    this.id = id;
    this.name = name;
    this.$parent = parent;
    // Build the form
    $form = $("<div class='upload_form_cont'>\
        <form class='upload_form' enctype='multipart/form-data' method='post' action='upload_theme_image.php'>\
            <input type='hidden' name='id' value='" + id + "' />\
            <input type='hidden' name='name' value='" + name + "' />\
                <div><input type='file' name='image_file' class='image_file' /></div>\
            <div>\
                <input class='start_upload' type='button' value='Upload' />\
            </div> \
            <div class='error'></div> \
            <div class='progress_info'> \
                <div class='progress'></div> \
                <div class='progress_percent'>&nbsp;</div> \
                <div class='clear_both'></div> \
                <div> \
                    <div class='speed'>&nbsp;</div> \
                    <div class='remaining'>&nbsp;</div> \
                    <div class='b_transfered'>&nbsp;</div> \
                    <div class='clear_both'></div> \
                </div> \
            </div> \
        </form> \
    </div>").appendTo(parent);
    
    
    
    
    // Find the file input
   var $image_file = parent.find(".image_file");
    // Attach a listener to it
    // $image_file.change(this.fileSelected);
    
    var that = this;
    
    $image_file.change(function() {
        that.fileSelected();
    });
    
    
    
    var $start_upload = parent.find(".start_upload");
    $start_upload.click(function() {
        that.startUploading();
    });    
}


UploadForm.prototype.fileSelected = function(){
    // get selected file element
    var oFile = this.findElement('image_file').files[0];

    // filter for image files
    var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
    if (! rFilter.test(oFile.type)) {
        this.showMessage("You should select valid image files only!");
        return;
    }

    // little test for filesize
    if (oFile.size > iMaxFilesize) {
        this.showMessage("Your file is very big. We can't accept it. Please select more small file.");
        return;
    }

    // read selected file as DataURL
//    oReader.readAsDataURL(oFile);
}


UploadForm.prototype.startUploading = function(){
    // cleanup all temp states
    iPreviousBytesLoaded = 0;

    this.findElement('error').style.display = 'none';
    this.findElement('progress_percent').innerHTML = '';
    var oProgress = this.findElement('progress');
    oProgress.style.display = 'block';
    oProgress.style.width = '0px';

    // get form data for POSTing
    //var vFD = findElement('upload_form').getFormData(); // for FF3
    var vFD = new FormData(this.findElement('upload_form')); 

    // create XMLHttpRequest object, adding few event listeners, and POSTing our data
    var oXHR = new XMLHttpRequest();
    var that = this;
    oXHR.upload.addEventListener('progress', function(e) {that.uploadProgress(e);}, false);
    oXHR.addEventListener('load', function(e) {that.uploadFinish(e);}, false);
    oXHR.addEventListener('error', function(e) {that.uploadError(e);}, false);
    oXHR.addEventListener('abort', function(e) {that.uploadAbort(e);}, false);
    oXHR.open('POST', 'upload_theme_image.php');
    oXHR.send(vFD);

    // set inner timer
    oTimer = setInterval(function() {that.doInnerUpdates();}, 300);
}


function secondsToTime(secs) { // we will use this function to convert seconds in normal time format
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600))/60);
    var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

    if (hr < 10) {hr = "0" + hr; }
    if (min < 10) {min = "0" + min;}
    if (sec < 10) {sec = "0" + sec;}
    if (hr) {hr = "00";}
    return hr + ':' + min + ':' + sec;
};

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

UploadForm.prototype.showMessage = function(m) {
    this.findElement('error').style.display = 'block';
    this.findElement('error').text = m;
}



UploadForm.prototype.doInnerUpdates = function(){
    var iCB = iBytesUploaded;
    var iDiff = iCB - iPreviousBytesLoaded;

    // if nothing new loaded - exit
    if (iDiff == 0)
        return;

    iPreviousBytesLoaded = iCB;
    iDiff = iDiff * 2;
    var iBytesRem = iBytesTotal - iPreviousBytesLoaded;
    var secondsRemaining = iBytesRem / iDiff;

    // update speed info
    var iSpeed = iDiff.toString() + 'B/s';
    if (iDiff > 1024 * 1024) {
        iSpeed = (Math.round(iDiff * 100/(1024*1024))/100).toString() + 'MB/s';
    } else if (iDiff > 1024) {
        iSpeed =  (Math.round(iDiff * 100/1024)/100).toString() + 'KB/s';
    }

    this.findElement('speed').innerHTML = iSpeed;
    this.findElement('remaining').innerHTML = '| ' + secondsToTime(secondsRemaining);
}

UploadForm.prototype.uploadProgress = function(e) {
    if (e.lengthComputable) {
        iBytesUploaded = e.loaded;
        iBytesTotal = e.total;
        var iPercentComplete = Math.round(e.loaded * 100 / e.total);
        var iBytesTransfered = bytesToSize(iBytesUploaded);

        this.findElement('progress_percent').innerHTML = iPercentComplete.toString() + '%';
        this.findElement('progress').style.width = (iPercentComplete * 4).toString() + 'px';
        this.findElement('b_transfered').innerHTML = iBytesTransfered;
    } else {
        this.findElement('progress').innerHTML = 'unable to compute';
    }
}


UploadForm.prototype.uploadFinish = function(e){
    this.findElement('progress_percent').innerHTML = '100%';
    this.findElement('progress').style.width = '400px';
    // this.findElement('filesize').innerHTML = sResultFileSize;
    this.findElement('remaining').innerHTML = '| 00:00:00';

    clearInterval(oTimer);
    
    // Trigger the event
    this.uploadFinished();
}

UploadForm.prototype.uploadError = function(e){
    this.showMessage("An error occurred while uploading the file.");
    clearInterval(oTimer);
}  

UploadForm.prototype.uploadAbort = function(e){
    this.showMessage("The upload has been canceled by the user or the browser dropped the connection.");
    clearInterval(oTimer);
}


function registerUploadForm(parent,id,name) {
    var f = new UploadForm(parent,id,name); 
    return f;
}