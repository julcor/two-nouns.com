var noteObject = {
  a:  {
    note: "c"
  }, 

  s: {
    note: "d"
  },

  d: {
    note: "e"
  },

  f: {
    note: "f"
  }

};


$(window).keydown(function(e) {
  $(".message").text("");
  
  var key = e.key;
  console.log(key);

  var image = document.createElement("img");
  
  
  if (key in noteObject) {
    // this is a valid key (A, S, D, F, G, H, J, K, L)
    
    var actualNote = noteObject[key].note;
    console.log(actualNote);
    
    //these two lines play audio based on the key pressed 
    var audio = new Audio('assets/' + actualNote + '.wav');
    audio.play(); 

    image.src = 'assets/' + actualNote + '.jpg';
  } else {
    // this is not a valid key
    
    image.src = "assets/blank.jpg";
  
  }

  $('body').append(image);

});