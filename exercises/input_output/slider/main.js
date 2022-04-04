$("#size").change(function() {
  
  var size = $(this).val();
  var size_value = size + "px";

  $(".circle").css("height", size_value);
  $(".circle").css("width", size_value);

});
