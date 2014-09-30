const RESET = 1000;

var timeToReset = -1;

function Ball(player) {
    this.player = player;
    
    this.x = 800;
    this.y = HEIGHT/2;
    this.radius = 20;
    this.vx = 200;
    this.vy = 75;
}

Ball.prototype.init = function(data) {
    this.x = data["x"];
    this.y = data["y"];
    this.radious = data["radius"];
    this.vx = data["vx"];
    this.vy = data["vy"];
}



Ball.prototype.reset = function(player) {
    this.vx = 200;
    if (player == 1) {
        this.x = 200;
    } else {
        this.x = WIDTH - 200;   
        this.vx = -this.vx;
    }
    timeToReset = RESET;
    this.y = HEIGHT / 2;
    
    this.vy = 75;
}


Ball.prototype.update = function(delta) {
    if (timeToReset > 0) {
        timeToReset -= delta;
        return;   
    }
    
    
    this.x += this.vx * (delta / 1000);
    this.y += this.vy * (delta / 1000);
    
    // Check collision with right border
    var result = checkCollision(WIDTH, 0, WIDTH, HEIGHT, -1, 0, this.x, this.y, this.radius, this.vx, this.vy);
    // TODO: This check is not really well written, but works for now
    if (this.vx > 0 & result[0] < 0) {
        // Reset the ball
        // TODO: Put into a separate function
        scorePlayer1 += 1;
        this.reset(2);
    }


    this.vx = result[0];
    this.vy = result[1];
    
    
    // Check collision with left border
    result = checkCollision(0, 0, 0, HEIGHT, 1, 0, this.x, this.y, this.radius, this.vx, this.vy);
    if (this.vx < 0 & result[0] > 0) {
        // Reset the ball
        scorePlayer2 += 1;
        this.reset(1);
    }
    
    
    this.vx = result[0];
    this.vy = result[1];
    
    
    // Check collision with top border
    result = checkCollision(0, 0, WIDTH, 0, 0, 1, this.x, this.y, this.radius, this.vx, this.vy);
    this.vx = result[0];
    this.vy = result[1];
    
    
    // Check collision with bottom border
    result = checkCollision(0, HEIGHT, WIDTH, HEIGHT, 0, -1, this.x, this.y, this.radius, this.vx, this.vy);
    this.vx = result[0];
    this.vy = result[1];
}
    

// Check for collisions with the borders    
function checkCollision(p1X, p1Y, p2X, p2Y, nX, nY, cX, cY, r, vX, vY) {
    var resultOverall = new Array();
    
    // Check collision with border
    var result = CircleLineCollision(p1X, p1Y, p2X, p2Y, cX, cY, r);
    if (result.length > 0) {
        var colX;
        var colY;
        if (result.length == 2) {
            // We have only one collision point
            colX = result[0];
            colY = result[1];
        } else if (result.length == 4) {
            // We have two collision points, interpolate to the center of the two
            // TODO: Would make more sense to find the point where the circle is deepest into the line
            colX = (result[0] + result[2]) / 2;
            colY = (result[1] + result[3]) / 2;
        }
        
        // Get the vector from the collision to the ball
        var vecX = -vX;
        var vecY = -vY;
        
        var reflected = reflect(nX, nY, vecX, vecY);
        
        resultOverall.push(-reflected[0]);
        resultOverall.push(-reflected[1]);
        
        // Initiate a sound effect
        playSound(knockBuffer);
        
    } else {
        resultOverall.push(vX);
        resultOverall.push(vY);
    }
    return resultOverall;
}

// Check for collisions between a ball and a rectangle
function checkCollisionBallRect(ball, rect) {
    if (rect.pos != undefined) {
        rect.x = rect.pos.x;
        rect.y = rect.pos.y;
    }
    
    var closestPointX = ball.x;
    var closestPointY = ball.y;
    
    if (ball.x < rect.x) closestPointX = rect.x;
    else if (ball.x > rect.x + rect.width) closestPointX = rect.x + rect.width;
    
    if (ball.y < rect.y) closestPointY = rect.y;
    else if (ball.y > rect.y + rect.height) closestPointY = rect.y + rect.height;
    
    var diffX = closestPointX - ball.x;
    var diffY = closestPointY - ball.y; 
    
    if( diffX * diffX + diffY * diffY > ball.radius * ball.radius ) return null;
    
    console.log("Intersection");
    
    var result = new Array();
    result.push(closestPointX);
    result.push(closestPointY);
    
    // Handle the collision
    if (result != null) {
        // Handle collision here: TODO: Ugly
        var normalX = ball.x - result[0];
        var normalY = ball.y - result[1];
        
        var normalized = normalize(normalX, normalY);
        
        var dir = dot(normalized[0], normalized[1], ball.vx, ball.vy);
        if (dir < 0) {
            // Only do collision response if the ball is not already moving away.                
            var reflected = reflect(normalized[0], normalized[1], ball.vx, ball.vy);
            ball.vx = reflected[0];
            ball.vy = reflected[1];
            
            // Initiate a sound effect
            playSound(knockBuffer);
        }
    }
    
    return result;
}
    

function isPointInRectangle(pX, pY, rX, rY, w, h) {
    var result = (pX >= rX) & (pX <= rX + w) & (pY >= rY) & (pY <= rY + h);
    
    return result;
}

    
Ball.prototype.draw = function(ctx) {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  
  if (mode == "play") {
      ctx.drawImage(imgBall, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);  
  } else {
      drawCircle(ctx, this.x, this.y, this.radius);
  }
    
    
}
    
    
function reflect(nX, nY, vecX, vecY) {
    var result = new Array();
    result.push(vecX - 2 * dot(vecX, vecY, nX, nY) * nX);
    result.push(vecY - 2 * dot(vecX, vecY, nX, nY) * nY);
    return result;
}

function dot(v1X, v1Y, v2X, v2Y) {
   return v1X * v2X + v1Y * v2Y;
}

function normalize(v1, v2) {
    var result = new Array();
    
    var length = Math.sqrt(v1 * v1 + v2 * v2);
    result.push(v1 / length);
    result.push(v2 / length);
    
    return result;
}
    
    
/** Computes a possible collision between a circle and a line
* See http://devmag.org.za/2009/04/17/basic-collision-detection-in-2d-part-2/
*/
function CircleLineCollision(p1X, p1Y, p2X, p2Y, cX, cY, r) {
    var result = new Array();
    var localP1X = p1X - cX;
    var localP1Y = p1Y - cY;
    var localP2X = p2X - cX;
    var localP2Y = p2Y - cY;
    
    var p2_p1X = localP2X - localP1X;
    var p2_p1Y = localP2Y - localP1Y;
    
    var a = p2_p1X * p2_p1X + p2_p1Y * p2_p1Y;
    var b = 2 * ((p2_p1X * localP1X) + (p2_p1Y * localP1Y));
    var c = localP1X * localP1X + localP1Y * localP1Y - r * r;
    
    var delta = b * b - (4 * a * c);
    if (delta < 0) {
        // No intersection
        
    } else if (delta == 0) {
        var u = -b / (2 * a);
        var resultX = p1X + (u * p2_p1X);
        var resultY = p1Y + (u * p2_p1X);
        result.push(resultX);
        result.push(resultY);
    } else if (delta > 0) {
        sqrtDelta = Math.sqrt(delta);
        var u1 = (-b + sqrtDelta) / (2 * a);
        var u2 = (-b - sqrtDelta) / (2 * a);
        var result1X = p1X + (u1 * p2_p1X);
        var result1Y = p1Y + (u1 * p2_p1Y);
        var result2X = p1X + (u2 * p2_p1X);
        var result2Y = p1Y + (u2 * p2_p1Y);
        result.push(result1X);
        result.push(result1Y);
        result.push(result2X);
        result.push(result2Y);
    }
    return result;
}
