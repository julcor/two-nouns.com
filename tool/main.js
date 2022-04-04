// window.onload = function() {

// };
  // $("#oval").on({ 'touchstart' : function(){
  //   $("#oval").css("fill", "blue");
  //   console.log("touched!");
  //   // if you touch one of the adjective divs then
  // }});

const ongoingTouches = [];
var AudioContext = window.AudioContext ||
  window.webkitAudioContext;
var context = new AudioContext;
var masterVolume = context.createGain();

var ovalOsc = context.createOscillator();
var circleOsc = context.createOscillator();
var stairsOsc = context.createOscillator();

var biquadFilter = context.createBiquadFilter();


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
  masterVolume.gain.value = .6;

  ovalOsc.type = 'sine';
  ovalOsc.frequency.setValueAtTime(220, context.currentTime);
  ovalOsc.connect(masterVolume);


  console.log('Initialized.');
}

document.addEventListener("DOMContentLoaded", startup);


function handleStart(evt) {
  evt.preventDefault();
  switch(evt.currentTarget.id) {
  case "oval":
    ovalOsc = context.createOscillator();
    ovalOsc.type = 'sine';
    ovalOsc.frequency.setValueAtTime(220, context.currentTime);

    biquadFilter = context.createBiquadFilter();
    biquadFilter.type = "lowshelf";

    ovalOsc.connect(biquadFilter);
    biquadFilter.connect(masterVolume);
    ovalOsc.start(0);
    break;
  case "circle":
    circleOsc = context.createOscillator();
    circleOsc.type = 'sine';
    circleOsc.frequency.setValueAtTime(120, context.currentTime);

    biquadFilter = context.createBiquadFilter();
    biquadFilter.type = "highpass";

    circleOsc.connect(biquadFilter);
    biquadFilter.connect(masterVolume);

    circleOsc.connect(masterVolume);
    circleOsc.start(0);
    break;
  case "stairs":
    stairsOsc = context.createOscillator();
    stairsOsc.type = 'triangle';
    stairsOsc.frequency.setValueAtTime(220, context.currentTime);

    biquadFilter = context.createBiquadFilter();
    biquadFilter.type = "lowpass";

    stairsOsc.connect(biquadFilter);
    biquadFilter.connect(masterVolume);

    stairsOsc.connect(masterVolume);
    stairsOsc.start(0);
    break;
  }
  console.log('touchstart.');
}

function handleEnd(evt) {
  evt.preventDefault();
  console.log("end" + evt.currentTarget.id);
  switch(evt.currentTarget.id) {
  case "oval":
    ovalOsc.stop(0);
    break;
  case "circle":
    circleOsc.stop(0);
    break;
  case "stairs":
    stairsOsc.stop(0);
    break;
  }
  console.log('touchend.');
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
  console.log('touchend.');
}

  // const el = document.getElementById('canvas');
  // const ctx = el.getContext('2d');
  // const touches = evt.changedTouches;

  // for (let i = 0; i < touches.length; i++) {
  //   log(`touchstart: ${i}.`);
  //   ongoingTouches.push(copyTouch(touches[i]));
  //   const color = colorForTouch(touches[i]);
  //   log(`color of touch with id ${ touches[i].identifier } = ${ color }`);
  //   ctx.beginPath();
  //   ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
  //   ctx.fillStyle = color;
  //   ctx.fill();
  // }




function handleCancel(evt) {
}

function handleMove(evt) {
  const touch = evt.changedTouches[0];
  var xShift = map_range(touch.pageX, 0, 400, 7, -7);
  var yShift = map_range(touch.pageY, 0, 800, 7, -7);
  console.log("x shift: " + xShift + "y shift: " + yShift);

  
  switch(evt.currentTarget.id) {
  case "oval":
    biquadFilter.frequency.setValueAtTime(touch.pageX, context.currentTime);
    biquadFilter.gain.setValueAtTime(5, context.currentTime);
    biquadFilter.Q.setValueAtTime(touch.pageY, context.currentTime);
    var oval = document.getElementById("oval");
    oval.style.transform = "perspective(100px) rotateY(" + yShift + "deg) rotateX(" + xShift + "deg)";
    break;
  case "circle":
    biquadFilter.frequency.setValueAtTime(touch.pageX, context.currentTime);
    biquadFilter.gain.setValueAtTime(5, context.currentTime);
    biquadFilter.Q.setValueAtTime(touch.pageY, context.currentTime);
    var circle = document.getElementById("circle");
    circle.style.transform = "perspective(100px) rotateY(" + yShift + "deg) rotateX(" + xShift + "deg)";
    break;
  case "stairs":
    biquadFilter.frequency.setValueAtTime(touch.pageX, context.currentTime);
    biquadFilter.gain.setValueAtTime(5, context.currentTime);
    biquadFilter.Q.setValueAtTime(touch.pageY, context.currentTime);
    var stairs = document.getElementById("stairs");
    stairs.style.transform = "perspective(100px) rotateY(" + yShift + "deg) rotateX(" + xShift + "deg)";
    break;
  }
  console.log("x: " + touch.pageX);
  console.log("y: " + touch.pageY);



}


function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}


  // function playSound(touchObject, shape) {
  //   console.log("begin touch!");
  //   $(shape).css("fill", "#FF9C40");
  //   return;
  //  }

  // $("#oval").on({ 'touchstart' : playSound("hi", "#oval") });



  //  $("#oval").on({'touchend' : function(){
  //   $("#oval").css("fill", "#FF9C40");
  //   console.log("end touched!");
  //   // if you touch one of the adjective divs then
  // }});



  ///playSound function -> takes touch object 

    //playSound for shape (break?)
    //manipulate sound based on position 

