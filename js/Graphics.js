function drawRect(ctx, x,y,w,h) {
      ctx.beginPath();
      ctx.rect(x,y,w,h);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
}
            
function drawLine(ctx, v) {
    ctx.beginPath();
    if (v.x < 0) {
        // Line is along the y-axis
        ctx.moveTo(0, v.y);
        ctx.lineTo(WIDTH, v.y);
    }
    if (v.y < 0) {
        // Line is along the x-axis
        ctx.moveTo(v.x, 0);
        ctx.lineTo(v.x, HEIGHT);
    }
    ctx.stroke();
    ctx.fill();
}
            
    
            
function drawCircle(ctx, x,y,r) {
    ctx.beginPath();
  ctx.arc(x, y, r, 0 , 2 * Math.PI, false);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}