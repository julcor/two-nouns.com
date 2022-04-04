var nouns = [];
var verbs = [];
var adjectives = [];
var constructedWord = [];


window.onload = function() {
  $.ajaxSetup({async:false});

  $.get('nouns.txt', function(data) {
    nouns = data.split("\n");
  }, 'text');

  $.get('verbs.txt', function(data) {
    verbs = data.split("\n");
  }, 'text');

  $.get('adjectives.txt', function(data) {
    adjectives = data.split("\n");
  }, 'text');

  for(var i = 0; i < 10; i++) {
    var randomIndex = Math.floor((Math.random() * adjectives.length) + 1);
    var div = $("<div>", {class: "words"});
    div.html(adjectives[randomIndex]);
    $("#adjectives").append(div); 
  }

};
  // $("#adjectives .words")

  document.addEventListener('touchstart', function () {
    console.log("touched word");
  });

  $("#adjectives").on({ 'touchstart' : function(){
    $("#adjectives").css("background-color", "blue");
    // if you touch one of the adjective divs then
    for(var i = 0; i < 10; i++) {
      var randomIndex = Math.floor((Math.random() * nouns.length) + 1);
      var div = $("<div>", {class: "words"});
      div.html(nouns[randomIndex]);
      $("#nouns").append(div); 
    }
  }});

  $("#adjectives").on({ 'touchend' : function(){
    $("#adjectives").css("background-color", "red");
    var node= document.getElementById("nouns");
      while (node.firstChild) {
          node.removeChild(node.firstChild);
      }
    }});

  $("#nouns").on({ 'touchstart' : function(){
    $("#nouns").css("background-color", "blue");
    // if you touch one of the adjective divs then
    for(var i = 0; i < 10; i++) {
      var randomIndex = Math.floor((Math.random() * verbs.length) + 1);
      var div = $("<div>", {class: "words"});
      div.html(verbs[randomIndex]);
      $("#verbs").append(div); 
    }
  }});

    $("#nouns").on({ 'touchend' : function(){
    $("#nouns").css("background-color", "red");
    var node= document.getElementById("verbs");
      while (node.firstChild) {
          node.removeChild(node.firstChild);
      }
    }});

  $("#verbs").on({ 'touchstart' : function(){
    $("#verbs").css("background-color", "blue");
    //construcedWord[2] = currentWord;
    //show construcedWord;
  }});

   $("#verbs").on({ 'touchend' : function(){
    $("#verbs").css("background-color", "red");
  }});



// $(".words").addEventListener('touchstart', process_touchstart, false);
// $(".words").addEventListener('touchmove', process_touchmove, false);
// $(".words").addEventListener('touchcancel', process_touchcancel, false);
// $(".words").addEventListener('touchend', process_touchend, false);

// function process_touchstart(ev) {
//   $(".col").css("background-color", "blue");
//   // Use the event's data to call out to the appropriate gesture handlers
//   // switch (ev.touches.length) {
//   //   case 1: handle_one_touch(ev); break;
//   //   case 2: handle_two_touches(ev); break;
//   //   case 3: handle_three_touches(ev); break;
//   //   default: gesture_not_supported(ev); break;
//   // }
// }




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


