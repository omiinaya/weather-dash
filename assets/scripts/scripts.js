var locId;
var locName;
var fixedName;
var locLon;
var locLat;
var foreData;
var uvData;
var arraySize;

var dt;
var dt2;
var dt3;
var dt4;
var dt5;
var date;
var date2;
var date3;
var date4;
var date5;

var arrHistory = [];

var key = "5495b7f13ab5bdde931c6f4d218ed2e4";

function pageLoad() {
  getLocation()
  enterKey()
  testAlert()
}

function setUserInput() {
  locName = $("#user-input").val();
  runSearch()
}

function runSearch() {
  //gets user input and capitalizes the first letter of each word.
  fixInput()

  //run the functions that get our coordinates and location id.
  getCoordinates()
  getLocationId()

  //API URLs crafted using the coordinates and location ids we got from before.
  queryURL1 = "https://api.openweathermap.org/data/2.5/forecast?id=" + locId + "&APPID=" + key;
  queryURL2 = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + locLat + "&lon=" + locLon + "&APPID=" + key;

  //run our forecast, uv, and history functions.
  ajaxForecast()
  ajaxUV()
  updateHistory()
}

//capitalizes the first letter of each word provided by the user.
function fixInput() {
  fixedName = locName.split(' ').map(eachWord =>
    eachWord.charAt(0).toUpperCase() + eachWord.slice(1)
  ).join(' ');
}

//removes hours from the date provided by the API.
function fixDate() {
  date1 = dt1.substring(0, 10);
  date2 = dt2.substring(0, 10);
  date3 = dt3.substring(0, 10);
  date4 = dt4.substring(0, 10);
  date5 = dt5.substring(0, 10);
}

//pulls coordinates from our data.js file.
function getCoordinates() {
  for (var i = 0; i < jsonData.length; i++) {
    if (jsonData[i].name == fixedName) {
      locLon = jsonData[i].coord.lon;
      locLat = jsonData[i].coord.lat;
    }
  }
}

//pulls locationids from our data.js file.
function getLocationId() {
  for (var i = 0; i < jsonData.length; i++) {
    if (jsonData[i].name == fixedName) {
      locId = jsonData[i].id;
    }
  }
}

//gets forecast data from the API in JSON format.
function ajaxForecast() {
  if (locId) {
    $.ajax({
      url: queryURL1,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      foreData = response;
      passData();
    });
  }
}

//gets UV data from API in JSON format.
function ajaxUV() {
  if (locName) {
    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(function (response) {
      console.log(response)
      uvData = response;
    });
  }
}

function passData() {
  $("#cityName").text(fixedName)
  //pull dt_txts from each index to use in fixDate()
  dt1 = foreData.list[0].dt_txt;
  dt2 = foreData.list[8].dt_txt;
  dt3 = foreData.list[16].dt_txt;
  dt4 = foreData.list[24].dt_txt;
  dt5 = foreData.list[32].dt_txt;
  fixDate()
  //day1
  $("#date1").text("Date: " + date1)
  $("#temperature1").text("Temperature: " + foreData.list[0].main.temp)
  $("#humidity1").text("Humidity: " + foreData.list[0].main.humidity)
  $("#speed1").text("Wind Speed: " + foreData.list[0].wind.speed)
  //day2
  $("#date2").text("Date: " + date2)
  $("#temperature2").text("Temperature: " + foreData.list[8].main.temp)
  $("#humidity2").text("Humidity: " + foreData.list[8].main.humidity)
  $("#speed2").text("Wind Speed: " + foreData.list[8].wind.speed)
  //day3
  $("#date3").text("Date: " + date3)
  $("#temperature3").text("Temperature: " + foreData.list[16].main.temp)
  $("#humidity3").text("Humidity: " + foreData.list[16].main.humidity)
  $("#speed3").text("Wind Speed: " + foreData.list[16].wind.speed)
  //day4
  $("#date4").text("Date: " + date4)
  $("#temperature4").text("Temperature: " + foreData.list[24].main.temp)
  $("#humidity4").text("Humidity: " + foreData.list[24].main.humidity)
  $("#speed4").text("Wind Speed: " + foreData.list[24].wind.speed)
  //day5
  $("#date5").text("Date: " + date5)
  $("#temperature5").text("Temperature: " + foreData.list[32].main.temp)
  $("#humidity5").text("Humidity: " + foreData.list[32].main.humidity)
  $("#speed5").text("Wind Speed: " + foreData.list[32].wind.speed)
  //UV info
  $("#uv1").text("UV Index: " + uvData[0].value)
  $("#uv2").text("UV Index: " + uvData[1].value)
  $("#uv3").text("UV Index: " + uvData[2].value)
  $("#uv4").text("UV Index: " + uvData[3].value)
  $("#uv5").text("UV Index: " + uvData[4].value)
}

//testing li on click functionality.
function testAlert() {
  $('[id^="history"]').on("click", function () {
    locName = $(this).attr('value');
    runSearch()
  });
}

//allows searching by enter key.
function enterKey() {
  var enterText = document.getElementById("user-input");
  enterText.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      locName = $("#user-input").val();
      runSearch()
    }
  });
}

//updates history and places it on the left side of the page.
function updateHistory() {
  arraySize = arrHistory.length;
  arrHistory.push(fixedName);
  console.log(arrHistory);
  $("#updateHistory").append("<li id=history" + arraySize + " value=" + fixedName + ">" + fixedName + "</li>");
  testAlert();
}

function getLocation() {
  // Make sure browser supports this feature
  if (navigator.geolocation) {
    // Provide our showPosition() function to getCurrentPosition
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  // Grab coordinates from the given object
  locLat = position.coords.latitude;
  locLon = position.coords.longitude;
  var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?lat=" + locLat + "&lon=" + locLon + "&units=imperial&appid=" + key;
  console.log("Your coordinates are Latitude: " + locLat + " Longitude " + locLon);
  console.log(queryURL3);
  $.ajax({
    url: queryURL3,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    foreData = response;
    ajaxUV()
    passData();
  });
}
