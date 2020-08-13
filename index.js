// Import stylesheets
import './style.css';
// Import Jquery
import $ from 'jquery';
// Import Icon JSON
import './icons.js';

var iconsjson = localStorage.getItem('iconsjson');
var weatherIcons = JSON.parse(iconsjson);
console.log(weatherIcons);
var hell;

$(function(){

  $("#search").click(function(){
    $("#welcome").hide();
  });
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?&lat=42.4348&lon=-83.9849&appid=ab2648b7507d47338137dd253097df5c",
    success: function(result){
      hell = result;
      console.log(hell);
      hellCard();
  },
  error: function(xhr,status,error){
    console.log(error);
  }
  });

});

function hellCard() {
  var weather = hell.weather[0];
  console.log(weather.icon);
  //Create icon class name
  var prefix = 'wi wi-';
  var code = weather.id;
  var icon = weatherIcons[code].icon;

  // If we are not in the ranges mentioned above, add a day/night prefix.
  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    icon = 'day-' + icon;
  }

  // Finally tack on the prefix.
  icon = prefix + icon;
  $("#hell").attr('class',icon);
}
