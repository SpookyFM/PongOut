function Brick() {
    // Top-left corner
    this.pos = new Vec2(0, 0);
    this.width = 20;
    this.height = 80;
}


Brick.prototype.init = function(data) {
    this.pos.x = data["pos"]["x"];
    this.pos.y = data["pos"]["y"];
    this.width = data["width"];
    this.height = data["height"];    
}


Brick.prototype.draw = function(ctx) {
  if (this.isSelected) {
    ctx.fillStyle = "red";
  } else {
    ctx.fillStyle = "white";   
  }
  
  ctx.strokeStyle = "black";
    if (mode == "play") {
    ctx.drawImage(imgBrick, this.pos.x, this.pos.y, this.width, this.height);  
    } else {
    drawRect(ctx, this.pos.x,this.pos.y,this.width,this.height);
    }
  ctx.fillStyle = "purple";   
}


function appendLine(array, x, y) {
    var line = new Line();
    line.pos.x = x;
    line.pos.y = y;
    array.push(line);
}

// Checks if the bricks overlaps the other brick in a dimension.
Brick.prototype.overlaps = function(other) {
    var result = new Array();
    var line;
    // Check along the x-axis
    if (this.pos.x == other.pos.x) {
        appendLine(result, this.pos.x, -1);
    } 
    if (this.pos.x == other.pos.x + other.width) {
        appendLine(result, this.pos.x, -1);
    } 
    if (this.pos.x + this.width == other.pos.x) {
       appendLine(result, this.pos.x + this.width, -1);
    } 
    if (this.pos.x + this.width == other.pos.x + other.width) {
        appendLine(result, this.pos.x + this.width, -1);
    }
    
    // Check along the y-axis
    if (this.pos.y == other.pos.y) {
        appendLine(result, -1, this.pos.y);
    }
    if (this.pos.y == other.pos.y + other.height) {
        appendLine(result, -1, this.pos.y);
    }
    if (this.pos.y + this.height == other.pos.y) {
       appendLine(result, -1, this.pos.y + this.height);
    } 
    if (this.pos.y + this.height == other.pos.y + other.height) {
        appendLine(result, -1, this.pos.y + this.height);
    }
    
    return result;
}
    
    