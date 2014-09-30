// Manages functions for the editor functionality of aligning the objects
var gridX = 4;
var gridY = 4;

function getClosestGrid(pos) {
    var result = new Object();
    result.x = getClosest(pos.x, gridX);
    result.y = getClosest(pos.y, gridY);
}
        
function getClosest(v, grid) {
    var div = v / grid;
    var remainder = div - Math.floor(div);
    if (remainder < 0.5) {
        return Math.floor(div) * grid;   
    } else {
        return (Math.floor(div) + 1) * grid;   
    }
}