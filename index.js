// Import stylesheets
import './style.css';
// Import Jquery
import $ from 'jquery';
//import bootstrap
import 'bootstrap';
// Import Icon JSON
import './icons.js';

var iconsjson = localStorage.getItem('iconsjson');
var weatherIcons = JSON.parse(iconsjson);
var hell;
var owid = ""








$(function(){

  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?&lat=42.4348&lon=-83.9849&appid="+owid,
    success: function(result){
      hell = result;
      console.log(hell);
      hellCard();
  },
  error: function(xhr,status,error){
    console.log(error);
  }
  });

var x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

getLocation();
function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}



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
}
