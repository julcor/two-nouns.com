//get accelerometer

//when accelerometer triggered, change image to next in sequence

//at end of sequence, pick random number from 1-3 and display that PNG

//press with two fingers to reset?


var acc_x = 0.0;
var acc_y = 0.0;
var acc_z = 0.0;
var index = 0;
var rpsSeq = ["assets/rock-0-big.png", "assets/rock-1-big.png", "assets/rock-2-big.png", "assets/rock-3-big.png", "assets/r.png", "assets/p.png", "assets/s.png"];


function getAccel(){
	console.log("yo!");
    DeviceMotionEvent.requestPermission().then(response => {
        if (response == 'granted') {
       // Add a listener to get smartphone orientation 
            window.addEventListener('devicemotion',(event) => {
                // Expose each orientation angle in a more readable way
            	acc_x = event.acceleration.x;
            	acc_y = event.acceleration.y;
				acc_z = event.acceleration.z;
                if(acc_x < -10) {
                	updateImage();
                	//progress to next image
                }
            });
        }
    });
}



function updateImage() {
	console.log("index", index)
	if(index > 3) {
		// Returns a random integer from 0 to 2:
		index = Math.floor(Math.random() * 3) + 4;
		document.getElementById("rpsImg").src= rpsSeq[index];
		index=1;
	} else {
		document.getElementById("rpsImg").src= rpsSeq[index];
		index++;
	}
}
