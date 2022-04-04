$("#red").change(function() {
  $(".red").hide();
  if ($("#red").is(":checked")) {
    $(".red").show();
  }
})

$("#blue").change(function() {
  $(".blue").hide();
  if ($("#blue").is(":checked")) {
    $(".blue").show();
  }
})

$("#green").change(function() {
  $(".green").hide();
  if ($("#green").is(":checked")) {
    $(".green").show();
  }
})