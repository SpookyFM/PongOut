var myKeyDown = [];

for (var i = 0; i < 255; i++) {
    myKeyDown.push(false);   
}

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_SHIFT = 16;
const KEY_W = 87;
const KEY_S = 83;
const KEY_DELETE = 46;

function onkeydown(event) {
    myKeyDown[event.keyCode] = true;
  }

function onkeyup(event) {
    myKeyDown[event.keyCode] = false;
  }


function isKeyDown(keyCode) {
    return myKeyDown[keyCode];   
}