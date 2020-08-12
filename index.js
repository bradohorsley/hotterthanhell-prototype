// Import stylesheets
import './style.css';
// Import Jquery
import $ from 'jquery';

var hell;

$(function(){

  $("#search").click(function(){
    $("#welcome").hide();
  });
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=Hell,USA&appid=ab2648b7507d47338137dd253097df5c",
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
}
