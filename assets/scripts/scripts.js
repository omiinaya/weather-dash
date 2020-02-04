var d = new Date();
var month = d.getMonth()+1
var nd = month+"/"+d.getDate()+"/"+ d.getYear()
var locId = "";
var locName = "";
var queryURL = "";
var queryURL2 = "";
var locLon = "";
var locLat = "";

function getUserInput() {
  locName = $("#user-input").val()
  queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+locName+"&appid=5495b7f13ab5bdde931c6f4d218ed2e4"
  queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?id="+locId+"&APPID=5495b7f13ab5bdde931c6f4d218ed2e4"
  queryURL3 = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat="+locLat+"&lon="+locLon+"&APPID=5495b7f13ab5bdde931c6f4d218ed2e4"
  
  getLocationId()
  getCoordinates()
  ajaxWeather()
  ajaxForecast()
  ajaxUV()
}
function getCoordinates() {
  for (var i=0; i<jsonData.length; i++) {
    if (jsonData[i].name == locName) {
      locLon = jsonData[i].coord.lon;
      locLat = jsonData[i].coord.lat;
    }
  }
  console.log(locLon);
  console.log(locLat);
}
function getLocationId() {
  for (var i=0; i<jsonData.length; i++) {
    if (jsonData[i].name == locName) {
      locId = jsonData[i].id;
    }
  }
  console.log(locId);
}
function ajaxWeather(){
  if (locName) {
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      $("#city").text("City: "+response.name)
      $("#date").text("Date: "+nd)
      $("#temperature").text("Temperature: "+response.main.temp)
      $("#humidity").text("Humidity: "+response.main.humidity)
      $("#speed").text("Wind Speed: "+response.wind.speed)
      $("#uv").text("UV Index: "+response.wind.speed)
    });
  }
}
function ajaxUV(){
  if (locName) {
    $.ajax({
      url: queryURL3,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });
  }
}
function ajaxForecast(){
  if (locId) {
    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });
  }
}