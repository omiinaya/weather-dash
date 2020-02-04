var locId = "";
var locName = "";
var fixedName = "";
var locLon = "";
var locLat = "";

var dt = "";
var dt2 = "";
var dt3 = "";
var dt4 = "";
var dt5 = "";
var date = "";
var date2 = "";
var date3 = "";
var date4 = "";
var date5 = "";

var arrHistory = [];

function getUserInput() {
  //gets user input and capitalizes the first letter of each word.
  locName = $("#user-input").val();
  fixInput()

  //run the functions that get our coordinates and location id.
  getCoordinates()
  getLocationId()

  //API URLs crafted using the coordinates and location ids we got from before.
  queryURL1 = "https://api.openweathermap.org/data/2.5/forecast?id="+locId+"&APPID=5495b7f13ab5bdde931c6f4d218ed2e4"
  queryURL2 = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat="+locLat+"&lon="+locLon+"&APPID=5495b7f13ab5bdde931c6f4d218ed2e4"
  
  //run our forecast, uv, and history functions.
  ajaxForecast()
  ajaxUV()
  updateHistory()

  $("#history").append("History:")
}
//capitalizes the first letter of each word provided by the user.
function fixInput() {
    fixedName = locName.split(' ').map(eachWord=>
      eachWord.charAt(0).toUpperCase() + eachWord.slice(1)
    ).join(' ');
}
//removes hours from the date provided by the API.
function fixDate() {
  date1 = dt1.substring(0,10);
  date2 = dt2.substring(0,10);
  date3 = dt3.substring(0,10);
  date4 = dt4.substring(0,10);
  date5 = dt5.substring(0,10);
}
//pulls coordinates from our data.js file.
function getCoordinates() {
  for (var i=0; i<jsonData.length; i++) {
    if (jsonData[i].name == fixedName) {
      locLon = jsonData[i].coord.lon;
      locLat = jsonData[i].coord.lat;
    }
  }
}
//pulls locationids from our data.js file.
function getLocationId() {
  for (var i=0; i<jsonData.length; i++) {
    if (jsonData[i].name == fixedName) {
      locId = jsonData[i].id;
    }
  }
}
//gets forecast data from the API in JSON format.
function ajaxForecast(){
  if (locId) {
    $.ajax({
      url: queryURL1,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      $("#cityName").text(fixedName)
      //pull dt_txts from each index to use in fixDate()
      dt1 = response.list[0].dt_txt;
      dt2 = response.list[8].dt_txt;
      dt3 = response.list[16].dt_txt;
      dt4 = response.list[24].dt_txt;
      dt5 = response.list[32].dt_txt;
      fixDate()
      //day1
      $("#date1").text("Date: "+date1)
      $("#temperature1").text("Temperature: "+response.list[0].main.temp)
      $("#humidity1").text("Humidity: "+response.list[0].main.humidity)
      $("#speed1").text("Wind Speed: "+response.list[0].wind.speed)
      //day2
      $("#date2").text("Date: "+date2)
      $("#temperature2").text("Temperature: "+response.list[8].main.temp)
      $("#humidity2").text("Humidity: "+response.list[8].main.humidity)
      $("#speed2").text("Wind Speed: "+response.list[8].wind.speed)
      //day3
      $("#date3").text("Date: "+date3)
      $("#temperature3").text("Temperature: "+response.list[16].main.temp)
      $("#humidity3").text("Humidity: "+response.list[16].main.humidity)
      $("#speed3").text("Wind Speed: "+response.list[16].wind.speed)
      //day4
      $("#date4").text("Date: "+date4)
      $("#temperature4").text("Temperature: "+response.list[24].main.temp)
      $("#humidity4").text("Humidity: "+response.list[24].main.humidity)
      $("#speed4").text("Wind Speed: "+response.list[24].wind.speed)
      //day5
      $("#date5").text("Date: "+date5)
      $("#temperature5").text("Temperature: "+response.list[32].main.temp)
      $("#humidity5").text("Humidity: "+response.list[32].main.humidity)
      $("#speed5").text("Wind Speed: "+response.list[32].wind.speed)
    });
  }
}
//gets UV data from API in JSON format.
function ajaxUV(){
  if (locName) {
    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(function(response) {
      console.log(response)
      $("#uv1").text("UV Index: "+response[0].value)
      $("#uv2").text("UV Index: "+response[1].value)
      $("#uv3").text("UV Index: "+response[2].value)
      $("#uv4").text("UV Index: "+response[3].value)
      $("#uv5").text("UV Index: "+response[4].value)
    });
  }
}
//updates history and places it on the left side of the page.
function updateHistory() {
  arrHistory = arrHistory.concat(fixedName);
  console.log(arrHistory)
  $("#updateHistory").append("<li>"+fixedName)
}