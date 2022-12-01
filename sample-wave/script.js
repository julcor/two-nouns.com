var audio = new Audio('assets/talking.mp3');

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
var slowDown = 0;

function getAccel(){
	console.log("yo!");
    DeviceMotionEvent.requestPermission().then(response => {
        if (response == 'granted') {
       // Add a listener to get smartphone orientation 
            window.addEventListener('devicemotion',(event) => {
            	// console.log("permission granted");
            	acc_x = event.acceleration.x;
            	acc_y = event.acceleration.y;
				acc_z = event.acceleration.z;
				// console.log(slowDown, "slowDown");
                if(acc_x < -1.3) {
                	slowDown++;
                	if(audio.paused) {
                		audio.play();		
                	}
                	if(slowDown >= 100) {
                		slowDown = 0;
                		changeRate(acc_x);
                	}
                } else {
                	if(!audio.paused) {
                		audio.pause();
                		console.log("sound paused");
                	}
                }
            });
        }
    });
}

window.addEventListener('click', (event) => {
	audio.loop = true;
	audio.play();
});


function changeRate(rate) {
		var rateX = map_range(Math.abs(rate), 1, 35, .10, 3);
		rateX = rateX.toPrecision(2)
		audio.playbackRate = rateX;
		console.log("playing sound with rate:", rateX);
}

function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}


