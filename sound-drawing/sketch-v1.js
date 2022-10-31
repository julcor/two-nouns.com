let mic, fft, drawCount;
let pointArray = [];

function setup() {
  createCanvas(710, 400);
  noFill();

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  drawCount = 0;
}

function draw() {
  background(200);
  drawCount++;
  let spectrum = fft.analyze();
  var greatestAmp = 0;
  var loudFreq = 0;
  for (i = 0; i < spectrum.length; i++) {
    if(spectrum[i] > greatestAmp) {
      loudFreq = i;
      append(pointArray, loudFreq);
    }
  }
  
  //makes sure there are enough points to draw a line
  if(pointArray.length > 1) {
    for (let i = 0; i < pointArray.length-1; i++) {
      line(i, pointArray[i], i+1, pointArray[i+1]);
    }
  }
  
  // print(loudFreq)
  // print(drawCount)
  // point(drawCount, loudFreq);
  stroke('purple'); // Change the color
  strokeWeight(10); // Make the points 10 pixels 
}
