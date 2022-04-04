var lastStroke = null;
$(window).keydown(function(e){
  $(".message").html("");
  var key = e.key;
  var audio;
  var elapsedTime = null;

 if (lastStroke !== null) {
    let currentStroke = new Date().getTime();
    elapsedTime = currentStroke-lastStroke;
    elapsedTime = elapsedTime - (elapsedTime * 2);
    elapsedTime = (elapsedTime+10000)*2/14000;
    elapsedTime = elapsedTime.toFixed(2);
  } 

  lastStroke = new Date().getTime();
  console.log(key);
  $(".message").append(key);
  audio = new Audio('assets/' + key + '.mp3');

  if (elapsedTime == null) {
    elapsedTime = 2;
  }
  if (elapsedTime <= 0) {
    elapsedTime = .1;
  }

  audio.playbackRate=elapsedTime;
  audio.play();
});





//   switch (key) {
//   case "a":
//     $(".message").append("a");
//     audio = new Audio('assets/a.mp3');
//     break;
//   case "b":
//     $(".message").append("b");
//     audio = new Audio('assets/b.mp3');
//     break;
//   case "c":
//     $(".message").append("b");
//     audio = new Audio('assets/c.mp3');
//     break;
//   case "d":
//     $(".message").append("b");
//     audio = new Audio('assets/c.mp3');
//     break;
//   case "e":
//     $(".message").append(key);
//     break;
//   case "f":
//     $(".message").append(key);
//     $("img").toggle();
//     break;
//   case "g":
//     $(".message").append(key);
//     $("img").toggle();
//     break;
//   case "h":
//     $(".message").append(key);
//     $("*").toggle();
//     break;
// }