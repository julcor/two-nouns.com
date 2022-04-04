const notes = {
    "C3":  130.81,  
    "Db3":  138.59,  
    "D3":  146.83,  
    "Eb3":  155.56, 
    "E3":  164.81, 
    "F3":  174.61,  
    "Gb3":  185.00,  
    "G3":  196.00, 
    "Ab3":  207.65,
    "A3":  220.00,  
    "Bb3":  233.08, 
    "B3":  246.94,
    "C4": 261.63,
    "Db4": 277.18,
    "D4": 293.66,
    "Eb4": 311.13,
    "E4": 329.63,
    "F4": 349.23,
    "Gb4": 369.99,
    "G4": 392.00,
    "Ab4": 415.30,
    "A4": 440,
    "Bb4": 466.16,
    "B4": 493.88,
    "C5": 523.25
}


const ongoingTouches = [];
var AudioContext = window.AudioContext ||
  window.webkitAudioContext;
var context = new AudioContext;
var masterVolume = context.createGain();

var blockOsc = context.createOscillator();
var blockBQFil = context.createBiquadFilter();
var blockGNode = context.createGain();

var block_lfoGain = context.createGain();
var block_lfo = context.createOscillator();
var vibratoSpeed = 0;

var oscOn = false;

var px = 50; // Position x and y
var py = 50;
var vx = 0.0; // Velocity x and y
var vy = 0.0;
var updateRate = 1/60; // Sensor refresh rate

function startup() {
  const el = document.getElementById('block');
  el.addEventListener('touchstart', handleStart);
  el.addEventListener('touchend', handleEnd);
  el.addEventListener('touchcancel', handleCancel);
  el.addEventListener('touchmove', handleMove);

  masterVolume.connect(context.destination);
  masterVolume.gain.value = .6;

  console.log('Initialized.');
}

document.addEventListener("DOMContentLoaded", startup);
// document.addEventListener("DOMContentLoaded", getAccel);


let demo_button = document.getElementById("perms");
demo_button.onclick = function(e) {
  e.preventDefault();
  console.log ("button clicked");
  // Request permission for iOS 13+ devices
  if (
    DeviceMotionEvent &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    DeviceMotionEvent.requestPermission();
  }
  
  window.addEventListener("devicemotion", handleMotion);
  window.addEventListener("deviceorientation", handleOrientation);

};

function handleMotion(evt) {

}

function handleOrientation(evt) { 
   // Expose each orientation angle in a more readable way
  var rotation_degrees = evt.alpha;
  var frontToBack_degrees = evt.beta;
  var leftToRight_degrees = evt.gamma;
  
  // Update velocity according to how tilted the phone is
  // Since phones are narrower than they are long, double the increase to the x velocity
  vx = vx + leftToRight_degrees * updateRate*2; 
  vy = vy + frontToBack_degrees * updateRate;
  
  // Update position and clip it to bounds
  px = px + vx*.5;
  if (px > 98 || px < 0){ 
      px = Math.max(0, Math.min(98, px)) // Clip px between 0-98
      vx = 0;
  }

  py = py + vy*.5;
  if (py > 98 || py < 0){
      py = Math.max(0, Math.min(98, py)) // Clip py between 0-98
      vy = 0;
  }
  
  var dot = document.getElementsByIdName("indicator");
  dot.setAttribute('style', "left:" + (px) + "%;" +
                                "top:" + (py) + "%;");
}

function handleStart(evt) {
  evt.preventDefault();
  if(evt.currentTarget.id == "block") {

    if (!oscOn) {
      console.log("osc off!!!")
      document.getElementById("block").style.fill = "#37BC4C";
      blockOsc = context.createOscillator();
      blockOsc.type = 'triangle';
      blockOsc.frequency.setValueAtTime(notes["G4"], context.currentTime);

      blockBQFil = context.createBiquadFilter();
      blockBQFil.type = "lowpass";

      blockGNode = context.createGain();
      blockGNode.gain.value = .3;

      blockOsc.connect(blockBQFil);
      blockBQFil.connect(blockGNode);
      blockGNode.connect(masterVolume);
      blockOsc.start(0);
      oscOn=true;
    } else if (oscOn) {
      console.log("osc on!!!")
      console.log("end" + evt.currentTarget.id);
      if(evt.currentTarget.id ==  "block") {
        blockGNode.gain.setValueAtTime(blockGNode.gain.value, context.currentTime); 
        blockGNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.03);
        document.getElementById("block").style.fill = "none";
        var myTimeout = setTimeout(function() {
          blockOsc.stop(0);
          // block_lfo.stop(0);  
          blockOsc.disconnect(0);
          blockBQFil.disconnect(0);
        }, 30);
      }
      oscOn=false;
    }
    console.log('touch start');
  }
}

function handleMove(evt) {
  evt.preventDefault();
}

function inShape (shape, touch) {
  console.log("SHAPE:" + document.elementFromPoint(touch.pageX, touch.pageY).id);
  return true;
}

function handleEnd(evt) {
  evt.preventDefault();
}

function handleCancel(evt) {
  evt.preventDefault();
  console.log('touch canceled event');
}

function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}