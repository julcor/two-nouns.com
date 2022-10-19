let mic, fft, centroid;
let pointArray = [];

function setup() {
  createCanvas(5000, 1000);
  noFill();

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(1000);
  let spectrum = fft.analyze();
  centroid = fft.getCentroid();
  print(centroid);
  // var greatestAmp = 0;
  // var loudFreq = 0;
  // for (i = 0; i < spectrum.length; i++) {
  //   if(spectrum[i] > greatestAmp) {
  //     loudFreq = i;
  //     append(pointArray, loudFreq);
  //   }
  // }
  append(pointArray, centroid);
  
  //makes sure there are enough points to draw a line
  if(pointArray.length > 1) {
    beginShape();
    for (let i = 0; i < pointArray.length-1; i++) {
      let m1 = map(pointArray[i], 0, 7000, 0, height)
      let m2 = map(pointArray[i+1], 0, 7000, 0, height)
      vertex(i, m1);
      // if(pointArray[i] && pointArray[i+1] > 180) {
         // line(i, m1, i+1, m2);
        // line(i, pointArray[i], i+1, pointArray[i+1]);
      // }
    }
    endShape();
  }

  stroke('black'); // Change the color
  strokeWeight(2); // Make the points 10 pixels 
}
