// Loads a level file
function LevelLoader(url) {
    this.url = url;
}

// Start loading the level
LevelLoader.prototype.StartLoading = function(handler) {
   this.handler = handler;
    var that = this;
   $.get(this.url, function(data) {that.OnLevelLoaded(data, handler);});
}

LevelLoader.prototype.OnLevelLoaded = function(data, handler) {
    // TODO: How to correctly deserialize?
    for (var i = 0; i < data["paddles"].length; i++) {
        var paddle = new Paddle(data["paddles"][i]["player"]);
        paddle.init(data["paddles"][i]);
        paddles.push(paddle);
    }
    for (var i = 0; i < data["balls"].length; i++) {
        var ball = new Ball(data["balls"][i]["player"]);
        ball.init(data["balls"][i]);
        balls.push(ball);
    }
    for (var i = 0; i < data["bricks"].length; i++) {
        var brick = new Brick();
        brick.init(data["bricks"][i]);
        bricks.push(brick);
        console.log("Brick created." + brick.pos.x + " " + brick.pos.y);
    }
    
    console.log("Level loaded");
    this.handler();
}


