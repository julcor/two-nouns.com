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

var ovalOsc = context.createOscillator();
var circleOsc = context.createOscillator();
var stairsOsc = context.createOscillator();

var ovalBQFil = context.createBiquadFilter();
var circleBQFil = context.createBiquadFilter();
var stairsBQFil = context.createBiquadFilter();

var ovalGNode = context.createGain();
var circleGNode = context.createGain();
var stairsGNode = context.createGain();

var oval_lfoGain = context.createGain();
var oval_lfo = context.createOscillator();
var vibratoSpeed = 0;

function startup() {
  const el = document.getElementById('oval');
  el.addEventListener('touchstart', handleStart);
  el.addEventListener('touchend', handleEnd);
  el.addEventListener('touchcancel', handleCancel);
  el.addEventListener('touchmove', handleMove);

  const el2 = document.getElementById('circle');
  el2.addEventListener('touchstart', handleStart);
  el2.addEventListener('touchend', handleEnd);
  el2.addEventListener('touchcancel', handleCancel);
  el2.addEventListener('touchmove', handleMove);

  const el3 = document.getElementById('stairs');
  el3.addEventListener('touchstart', handleStart);
  el3.addEventListener('touchend', handleEnd);
  el3.addEventListener('touchcancel', handleCancel);
  el3.addEventListener('touchmove', handleMove);


  masterVolume.connect(context.destination);
  masterVolume.gain.value = 1;

  console.log('Initialized.');
}

document.addEventListener("DOMContentLoaded", startup);


function handleStart(evt) {
  evt.preventDefault();
  // const touch = evt.changedTouches[0];
  // var fingerDot = document.createElement('div');
  // fingerDot.className = "fingerDot";
  // fingerDot.style.left = touch.pageX + "px";
  // fingerDot.style.top = touch.pageY + "px";
  // document.body.appendChild(fingerDot);

  //use a key-dictionary thing to get from string to object 
  switch(evt.currentTarget.id) {
  case "oval":
    document.getElementById("oval").style.fill = "#FF9C40";
    ovalOsc = context.createOscillator();
    ovalOsc.type = 'sine';
    ovalOsc.frequency.setValueAtTime(notes["C4"], context.currentTime);

    ovalBQFil = context.createBiquadFilter();
    ovalBQFil.type = "lowshelf";

    ovalGNode = context.createGain();
    ovalGNode.gain.value = 1;

    oval_lfoGain.gain.setValueAtTime(4, 0);
    oval_lfo = context.createOscillator();
    oval_lfo.frequency.setValueAtTime(vibratoSpeed, 0);
    oval_lfo.start(0);  
    // oval_lfo.stop(context.currentTime + noteLength);
    oval_lfoGain.connect(ovalOsc.frequency);
    oval_lfo.connect(oval_lfoGain); 

    // console.log("OVAL START!");
    // console.log("lfo gain" + oval_lfoGain.gain());

    ovalOsc.connect(ovalBQFil);
    ovalBQFil.connect(ovalGNode);
    ovalGNode.connect(masterVolume);
    ovalOsc.start(0);
    break;
  case "circle":
    document.getElementById("circle").style.fill = "white";
    circleOsc = context.createOscillator();
    circleOsc.type = 'sine';
    circleOsc.frequency.setValueAtTime(notes["D4"], context.currentTime);

    circleBQFil = context.createBiquadFilter();
    circleBQFil.type = "highpass";

    circleGNode = context.createGain();
    circleGNode.gain.value = 1;

    circleOsc.connect(circleBQFil);
    circleBQFil.connect(circleGNode);
    circleGNode.connect(masterVolume);
    circleOsc.start(0);
    break;
  case "stairs":
    document.getElementById("stairs").style.fill = "#0081DF";
    stairsOsc = context.createOscillator();
    stairsOsc.type = 'triangle';
    stairsOsc.frequency.setValueAtTime(notes["G4"], context.currentTime);

    stairsBQFil = context.createBiquadFilter();
    stairsBQFil.type = "lowpass";

    stairsGNode = context.createGain();
    stairsGNode.gain.value = .8;

    stairsOsc.connect(stairsBQFil);
    stairsBQFil.connect(stairsGNode);
    stairsGNode.connect(masterVolume);
    stairsOsc.start(0);
    break;
  }
  console.log('touch start');
}

function handleMove(evt) {
  const touch = evt.changedTouches[0];
  //this is meant to be inverted 
  // var xShift = map_range(touch.pageY, 0, 400, 7.5, -7.5);
  // var yShift = map_range(touch.pageX, 0, 700, -7.5, 7.5);
  // console.log("x shift: " + xShift + "y shift: " + yShift);  
  switch(evt.currentTarget.id) {
  case "oval":
    if (inShape("oval", touch)) {
      var xShift = map_range(touch.pageY, 0, 400, 7.5, -7.5);
      var yShift = map_range(touch.pageX, 0, 200, -7.5, 7.5);
      vibratoSpeed = map_range(touch.pageY, 30, 400, 0, 30);
      oval_lfo.frequency.setValueAtTime(vibratoSpeed, 0);
      // ovalBQFil.frequency.setValueAtTime(touch.pageX, context.currentTime);
      ovalBQFil.gain.setValueAtTime(5, context.currentTime);
      ovalBQFil.Q.setValueAtTime(touch.pageY, context.currentTime);
      var oval = document.getElementById("oval");
      oval.style.transform = "perspective(600px) rotateY(" + yShift + "deg) rotateX(" + xShift + "deg)";
    }
    break;
  case "circle":
    var xShift = map_range(touch.pageY, 0, 250, 7.5, -7.5);
    var yShift = map_range(touch.pageX, 175, 375, -7.5, 7.5);
    circleBQFil.frequency.setValueAtTime(touch.pageX, context.currentTime);
    circleBQFil.gain.setValueAtTime(5, context.currentTime);
    circleBQFil.Q.setValueAtTime(touch.pageY, context.currentTime);
    var circle = document.getElementById("circle");
    circle.style.transform = "perspective(600px) rotateY(" + yShift + "deg) rotateX(" + xShift + "deg)";
    break;
  case "stairs":
    var xShift = map_range(touch.pageY, 200, 700, 7.5, -7.5);
    var yShift = map_range(touch.pageX, 0, 375, -7.5, 7.5);
    stairsBQFil.frequency.setValueAtTime(touch.pageX, context.currentTime);
    stairsBQFil.gain.setValueAtTime(5, context.currentTime);
    stairsBQFil.Q.setValueAtTime(touch.pageY, context.currentTime);
    var stairs = document.getElementById("stairs");
    stairs.style.transform = "perspective(600px) rotateY(" + yShift + "deg) rotateX(" + xShift + "deg)";
    break;
  }
  console.log("x: " + touch.pageX);
  console.log("y: " + touch.pageY);
}

function inShape (shape, touch) {
  console.log("SHAPE:" + document.elementFromPoint(touch.pageX, touch.pageY).id);
  return true;
}

function handleEnd(evt) {
  // ADD VOLUME RAMP HERE 

  evt.preventDefault();
  console.log("end" + evt.currentTarget.id);
  switch(evt.currentTarget.id) {
  case "oval":
    ovalGNode.gain.setValueAtTime(ovalGNode.gain.value, context.currentTime); 
    ovalGNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.03);
    document.getElementById("oval").style.fill = "none";
    var myTimeout = setTimeout(function() {
      ovalOsc.stop(0);
      oval_lfo.stop(0);  
      ovalOsc.disconnect(0);
      ovalBQFil.disconnect(0);
    }, 30);
    break;
  case "circle":
    circleGNode.gain.setValueAtTime(circleGNode.gain.value, context.currentTime); 
    circleGNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.03);
    document.getElementById("circle").style.fill = "none";
    var myTimeout = setTimeout(function() {
      circleOsc.stop(0);
      circleOsc.disconnect(0);
      circleBQFil.disconnect(0);
    }, 30);
    break;
  case "stairs":
    stairsGNode.gain.setValueAtTime(stairsGNode.gain.value, context.currentTime); 
    stairsGNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.03);
    document.getElementById("stairs").style.fill = "none";
    var myTimeout = setTimeout(function() {
      stairsOsc.stop(0);
      stairsOsc.disconnect(0);
      stairsBQFil.disconnect(0);
    }, 30);
    break;
  }
  console.log('touch end');
}

function handleCancel(evt) {
  evt.preventDefault();
  console.log("cancel" + evt.currentTarget.id);
  switch(evt.currentTarget.id) {
  case "oval":
    ovalOsc.stop(0);
    ovalOsc.disconnect(masterVolume);
    break;
  case "circle":
    circleOsc.stop(0);
    circleOsc.disconnect(masterVolume);
    break;
  case "stairs":
    stairsOsc.stop(0);
    stairsOsc.disconnect(masterVolume);
    break;
  }
  console.log('touch canceled');
}

function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}