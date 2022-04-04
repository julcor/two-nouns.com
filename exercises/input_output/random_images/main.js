var images = [
  "images/fsa_01.jpeg", 
  "images/fsa_02.jpeg", 
  "images/fsa_03.jpeg", 
  "images/fsa_04.jpeg", 
  "images/fsa_05.jpeg", 
  "images/fsa_06.jpeg", 
  "images/fsa_07.jpeg", 
  "images/fsa_08.jpeg", 
  "images/fsa_09.jpeg", 
]

var range = images.length;

$(window).click(function(){
  var index = Math.floor(Math.random() * range);
  var image_src = images[index];
  var image = document.createElement("img");
  console.log(image);
  image.src = image_src;
  $('body').append(image);

})