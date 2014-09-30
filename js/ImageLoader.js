// Helper class to save the url for each image object
function ImageUrl(img, url) {
    this.img = img;
    this.url = url;
}

// Loads a set of images and notifies the caller when they are done loading.
function ImageLoader() {
    this.remaining = 0;
    this.images = [];
}

// Add an Image object which will be initialized with the given url when StartLoading is called
ImageLoader.prototype.AddImage = function(img, url) {
    this.images.push(new ImageUrl(img, url));    
    
    this.remaining += 1;
}

// Start loading all images. Handler will be called when they are loaded.
ImageLoader.prototype.StartLoading = function(handler) {
    this.handler = handler;
    var that = this;
    for (var i = 0; i < this.remaining; i++) {
       this.images[i].img.onload = function() {that.ImageLoaded();};//this.ImageLoaded;
       this.images[i].img.src = this.images[i].url;
   }
}

ImageLoader.prototype.ImageLoaded = function() {
    this.remaining -= 1;
    if (this.remaining == 0) {
        console.log("All images loaded.");
        this.handler();   
    }
}




