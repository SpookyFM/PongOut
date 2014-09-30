function Line() {
    this.pos = new Vec2(0.0, 0.0);
}



Line.prototype.draw = function(ctx) {
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    drawLine(ctx, this.pos);
}