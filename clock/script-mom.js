const secondHand = document.querySelector('.second-hand');
// const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand.julio');
const hourHand_jul = document.querySelector('.hour-hand');

function setDate() {
  const now = new Date();

  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  const secHand_text = secondHand.querySelector('.type-sec');
  if(secondsDegrees%360 >= 90 && secondsDegrees%360 <= 270){
    secHand_text.style.transform = `rotate(-180deg)`;
  } else {
    secHand_text.style.transform = `rotate(0deg)`;
  }
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
  // minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  const hour = now.getHours();
  const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
  const hourHand_text = hourHand.querySelector('.type-hr');
  if(hourDegrees%360 >= 90 && hourDegrees%360 <= 270){
    hourHand_text.style.transform = `rotate(-180deg)`;
  } else {
    hourHand_text.style.transform = `rotate(0deg)`;
  }
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;


  // console.log(now.getTimezoneOffset());

  // console.log(now.getHours());

  //timeZone_jul is a hard coded value of my current timezone in hours from UTC
  var timeZone_jul = 6;
  var timezoneX = now.getTimezoneOffset()/60;
  var timeZoneY = timeZone_jul - timezoneX;


  const hour_jul = now.getHours() - timeZoneY;
  const hourDegrees_jul = ((hour_jul / 12) * 360) + ((mins/60)*30) + 90;
  const hourHand_jul_text = hourHand_jul.querySelector('.type-hr');
  if(hourDegrees_jul%360 >= 90 && hourDegrees_jul%360 <= 270){
    hourHand_jul_text.style.transform = `rotate(-180deg)`;
  } else {
    hourHand_jul_text.style.transform = `rotate(0deg)`;
  }
  hourHand_jul.style.transform = `rotate(${hourDegrees_jul}deg)`;

  //if both users are in same time zone
  if(hour_jul == hour) {
    hourHand_text.innerHTML = "us";
    hourHand_jul_text.style.display = "none";
  }
}



setInterval(setDate, 1000);

setDate();