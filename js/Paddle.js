

function Paddle(player) {
    this.player = player;
    
    this.width = 50;
    this.height = 150;
    
    if (player == 1) {
        this.x = 30;   
    } else {
        this.x = WIDTH - this.width - 30;
    }

    this.y = (HEIGHT - this.height) * 0.5;
    
    this.dx = 5;
    this.dy = 5;
    
    if (player == 1) {
        this.upKey = KEY_W;
        this.downKey = KEY_S;
    } else {
        this.upKey = KEY_UP;
        this.downKey = KEY_DOWN;
    }
}


Paddle.prototype.init = function(data) {
    this.player = data["player"];
    this.width = data["width"];
    this.height = data["height"];
    this.x = data["x"];
    this.y = data["y"];
    this.dx = data["dx"];
    this.dy = data["dy"];
}




Paddle.prototype.update = function() {
    // Move the paddle
    // TODO: Consider the frame time?
    
    if (isKeyDown(this.downKey)) {
        this.y += this.dy;
    }
    if (isKeyDown(this.upKey)) {
        this.y -= this.dy;
    }
    
    // Make sure the paddle stays in the playing field
    if (this.y < 0)
        this.y = 0;
    if (this.y + this.height > 768) {
        // TODO: Move the width and height to a variable!
        this.y = 768 - this.height;
    }
    
}
    
  

Paddle.prototype.draw = function(ctx) {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
    if (mode == "edit") {  
    drawRect(ctx, this.x,this.y,this.width,this.height);  
    } else {
        if (this.player == 2) {
            ctx.drawImage(imgPaddle, this.x, this.y, this.width, this.height);  
        } else {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.scale(-1, 1);
            
            ctx.drawImage(imgPaddle, 0, 0, this.width*-1, this.height);   
            ctx.restore();
        }
    }
    
  ctx.fillStyle = "purple";   
}