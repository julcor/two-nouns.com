var audio = new Audio('assets/alphabet.wav');

var totalX = 0;
var totalY = 0;
var moveX = 0;
var moveY = 0;

// document.addEventListener("mousemove", function(ev){
//     totalX += Math.abs(ev.movementX);
//     totalY += Math.abs(ev.movementY);
//     moveX += ev.movementX;
//     moveY += ev.movementY;
//     playSound(totalY);
// }, false);

// setInterval(function(){
//     console.log(`Speed X: ${totalX}px/s, Y: ${totalY}px/s`);
//     console.log(`Movement X: ${moveX}px/s, Y: ${moveY}px/s`);
//     moveX = moveY = totalX = totalY = 0;
//     if(totalY < 1) {
// 		audio.pause()
// 	}
// }, 100);





var acc_x = 0.0;
var acc_y = 0.0;
var acc_z = 0.0;


function getAccel(){
	console.log("yo!");
    DeviceMotionEvent.requestPermission().then(response => {
        if (response == 'granted') {
       // Add a listener to get smartphone orientation 
            window.addEventListener('devicemotion',(event) => {
            	console.log("permission granted");
            	acc_x = event.acceleration.x;
            	acc_y = event.acceleration.y;
				acc_z = event.acceleration.z;
                if(acc_x < -1) {
                	playSound(acc_x);
                } else {
                	audio.pause();
                }
            });
        }
    });
}

function playSound(rate) {
	if(totalY < 1) {
		audio.pause()
		console.log("sound paused");
	} else  {
		var rate = map_range(totalY, -1, -48, .25, 10);
		console.log(rate);
		audio.playbackRate = rate;
		audio.play();		
		console.log("playing sound with rate:", rate);
	}
}

function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}


