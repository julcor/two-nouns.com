//get accelerometer

//when accelerometer triggered, change image to next in sequence

//at end of sequence, pick random number from 1-3 and display that PNG

//press with two fingers to reset?


var acc_x = 0.0;
var acc_y = 0.0;
var acc_z = 0.0;

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
                	document.ElementsByClassName("container").style.backgroundColor = white;
                }
            });
        }
    });
}
