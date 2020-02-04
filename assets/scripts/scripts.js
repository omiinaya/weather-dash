var locId = "";
var locName = "";
var locLon = "";
var locLat = "";

function getUserInput() {
  locName = $("#user-input").val();
  getCoordinates()
  getLocationId()

  queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+locName+"&appid=5495b7f13ab5bdde931c6f4d218ed2e4"
  queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?id="+locId+"&APPID=5495b7f13ab5bdde931c6f4d218ed2e4"
  queryURL3 = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat="+locLat+"&lon="+locLon+"&APPID=5495b7f13ab5bdde931c6f4d218ed2e4"
  
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
}
function getLocationId() {
  for (var i=0; i<jsonData.length; i++) {
    if (jsonData[i].name == locName) {
      locId = jsonData[i].id;
    }
  }
}
function ajaxForecast(){
  if (locId) {
    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      //day1
      $("#city1").text("City: "+locName)
      $("#date1").text("Date: "+response.list[0].dt_txt)
      $("#temperature1").text("Temperature: "+response.list[0].main.temp)
      $("#humidity1").text("Humidity: "+response.list[0].main.humidity)
      $("#speed1").text("Wind Speed: "+response.list[0].wind.speed)
      $("#uv1").text("UV Index: "+response.list[0].wind.speed)
      //day2
      $("#city2").text("City: "+locName)
      $("#date2").text("Date: "+response.list[8].dt_txt)
      $("#temperature2").text("Temperature: "+response.list[8].main.temp)
      $("#humidity2").text("Humidity: "+response.list[8].main.humidity)
      $("#speed2").text("Wind Speed: "+response.list[8].wind.speed)
      $("#uv2").text("UV Index: "+response.list[8].wind.speed)
      //day3
      $("#city3").text("City: "+locName)
      $("#date3").text("Date: "+response.list[16].dt_txt)
      $("#temperature3").text("Temperature: "+response.list[16].main.temp)
      $("#humidity3").text("Humidity: "+response.list[16].main.humidity)
      $("#speed3").text("Wind Speed: "+response.list[16].wind.speed)
      $("#uv3").text("UV Index: "+response.list[16].wind.speed)
      //day4
      $("#city4").text("City: "+locName)
      $("#date4").text("Date: "+response.list[24].dt_txt)
      $("#temperature4").text("Temperature: "+response.list[24].main.temp)
      $("#humidity4").text("Humidity: "+response.list[24].main.humidity)
      $("#speed4").text("Wind Speed: "+response.list[24].wind.speed)
      $("#uv4").text("UV Index: "+response.list[24].wind.speed)
      //day5
      $("#city5").text("City: "+locName)
      $("#date5").text("Date: "+response.list[32].dt_txt)
      $("#temperature5").text("Temperature: "+response.list[32].main.temp)
      $("#humidity5").text("Humidity: "+response.list[32].main.humidity)
      $("#speed5").text("Wind Speed: "+response.list[32].wind.speed)
      $("#uv5").text("UV Index: "+response.list[32].wind.speed)
    });
  }
}
function ajaxUV(){
  if (locName) {
    $.ajax({
      url: queryURL3,
      method: "GET"
    }).then(function(response) {
    });
  }
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