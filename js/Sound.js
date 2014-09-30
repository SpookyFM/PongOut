// The sound played when a ball hits a brick
var knockBuffer = null;

// The HTML 5 audio context
var audioContext;

// Initialize the audio context
function initAudio() {

    if (typeof AudioContext == "function") {
        audioContext = new AudioContext();
    } else if (typeof webkitAudioContext == "function") {
        audioContext = new webkitAudioContext();
    }
    
    
    
    var request = new XMLHttpRequest();
    request.open('GET', 'sound/knock.ogg', true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
        audioContext.decodeAudioData(request.response, function(buffer) {
            knockBuffer = buffer;
        }, onError);
    }
    request.send();
}

function onError() {
    
}

// Play a sound from a buffer
function playSound(buffer) {
    var source = audioContext.createBufferSource(); // creates a sound source
    source.buffer = buffer;                    // tell the source which sound to play
    source.connect(audioContext.destination);       // connect the source to the context's destination (the speakers)
    source.start(0);                           // play the source now
                                             // note: on older systems, may have to use deprecated noteOn(time);
}