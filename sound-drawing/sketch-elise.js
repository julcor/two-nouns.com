let mic, fft, centroid, canvasCount, c, shapeType, toggle;
let pointArray = [];

function setup() {
  c = createCanvas(1584, 1224);
  noFill();
  pixelDensity(2.0);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  canvasCount = 0;
  shapeType = POINTS;
  toggle = true;
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
    // beginShape(TRIANGLE_STRIP); //TRIANGLE_FAN
    var j = 0;
    for (let i = 0; i < pointArray.length-1; i++) {
      if(i%4) {
        // j = i+=9 this is broken, but does something interesting
        j = j+=8; 
        let m1 = map(pointArray[i], 10000, 0, 0, height)
        let m2 = map(pointArray[i+1], 10000, 0, 0, height)
        text('✹', j, m1);
        // vertex(j, m1);
        // if(pointArray[i] && pointArray[i+1] > 180) {
           // line(i, m1, i+1, m2);
          // line(i, pointArray[i], i+1, pointArray[i+1]);
        }
      }
    }
    // endShape(CLOSE);
    stroke('red'); // Change the color
    textSize(8);
    strokeWeight(1.5); // Make the points 10 pixels 

       // print("point array length: " + pointArray.length);
    if(pointArray.length >= width/5.95) {
      // print("array fulll!!!!" + pointArray.length);
      saveCanvas(c, 'e-draw-' + canvasCount, 'png');
      canvasCount++;
      pointArray = [];
    } 
    //NEW CODE -- when i = width , export canvas as image -- create var called image count? -- and restart array
  }

 

 


// function mouseClicked() {
//   if(toggle) {
//     endShape();
//     print("!!!!!!!traingle");
//     toggle = false;
//     shapeType = TRIANGLE_FAN;  
//     beginShape(shapeType);
//   } else {
//     endShape();
//     print("points");
//     toggle = true;
//     shapeType = POINTS;
//     beginShape(shapeType);
//   }
// }