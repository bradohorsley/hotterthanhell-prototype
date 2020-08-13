// Import stylesheets
import "./style.css";
// Import Jquery
import $ from "jquery";
//import bootstrap
import "bootstrap";
// Import Icon JSON
import "./icons.js";

var iconsjson = localStorage.getItem("iconsjson");
var weatherIcons = JSON.parse(iconsjson);
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var hell;
var owid = "ab2648b7507d47338137dd253097df5c";

$(function() {

  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/weather?&lat=42.4348&lon=-83.9849&appid=" +
      owid,
    success: function(result) {
      var dt = new Date( (result.dt + result.timezone ) * 1000 );
      var celcius = Math.round(result['main'].temp - 273.15);
      var farenheight = Math.round((celcius * 1.8) + 32);
      var rise = new Date((result['sys'].sunrise + result.timezone) * 1000);
      var set = new Date((result['sys'].sunset + result.timezone) * 1000);
      var data = [ {
      location: "Hell, USA",
      date: days[dt.getDay()] + " " + dt.getDate() + " " + months[dt.getMonth()],
      time: dt.getHours() + ":" + (dt.getMinutes()<10?'0':'') + dt.getMinutes(),
      description: result.weather[0].description,
      icon: getIcon(result.weather[0].id),
      temperature: result['main'].temp,
      celcius: celcius,
      farenheight: farenheight,
      wind: result['wind'].speed,
      humidity: result['main'].humidity,
      sunrise: rise.getHours() + ":" + (rise.getMinutes()<10?'0':'') + rise.getMinutes(),
      sunset: set.getHours() + ":" + (set.getMinutes()<10?'0':'') + set.getMinutes(),
    }
  ];
  console.log(data);
    hell = data;
    addWeatherCard(hell[0]);

    },
    error: function(xhr, status, error) {
      console.log(error);
    }
  });


});

function addWeatherCard(data) {
var weatherCard = $("template#weather-card").html();
var card = weatherCard.replace(/{{location}}/ig, data.location)
.replace(/{{date}}/ig, data.date)
.replace(/{{time}}/ig, data.time)
.replace(/{{description}}/ig, data.description)
.replace(/{{icon}}/ig, data.icon)
.replace(/{{celcius}}/ig, data.celcius)
.replace(/{{farenheight}}/ig, data.farenheight)
.replace(/{{wind}}/ig, data.wind)
.replace(/{{humidity}}/ig, data.humidity)
.replace(/{{sunrise}}/ig, data.sunrise)
.replace(/{{sunset}}/ig, data.sunset);
$("#weather-cards-container").prepend(card);
}

function getIcon(code) {
  var prefix = "wi wi-";
  var icon = weatherIcons[code].icon;
  // If we are not in the ranges mentioned above, add a day/night prefix.
  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    icon = "day-" + icon;
  }
  // Finally tack on the prefix.
  icon = prefix + icon;
  return icon;
}


  var x = document.getElementById("demo");
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
      showError(navigator.error);
    }
  }

  getLocation();
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        x.innerHTML = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred.";
        break;
    }
  }

  function showPosition(position) {
    x.innerHTML =
      "Latitude: " +
      position.coords.latitude +
      "<br>Longitude: " +
      position.coords.longitude;
  }


