// JavaScript code to handle scrolling and header animation
var prevScrollPos = window.pageYOffset;

window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  var header = document.getElementById("header");
  var nums = document.getElementById("big-num");


  if (prevScrollPos > currentScrollPos) {
    header.style.height = "120px";
    nums.style.transform = "scale(1,1)";
  } else {
    header.style.height = "0";
    nums.style.transform = "scale(1,.1)";
  }

  prevScrollPos = currentScrollPos;
};