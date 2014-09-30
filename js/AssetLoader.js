// Manages a set of loaders, and will give a callback when all are finished loading.
function AssetLoader() {
    this.remaining = 0;
    this.loaders = [];
}

AssetLoader.prototype.AddLoader = function(loader) {
    this.loaders.push(loader);    
    this.remaining += 1;
}

// Start loading using all loaders. Handler will be called when they are loaded.
AssetLoader.prototype.StartLoading = function(handler) {
   this.handler = handler;
    // TODO: There has to be a better idiom for this.
    var that = this;
    for (var i = 0; i < this.remaining; i++) {
       this.loaders[i].StartLoading(function() {that.onload();});
   }
}

AssetLoader.prototype.onload = function() {
    this.remaining -= 1;
    if (this.remaining == 0) {
        console.log("All assets loaded.");
        this.handler();   
    }
}

