var d = new Date();
var month = d.getMonth()+1
var nd = month+"/"+d.getDate()+"/"+ d.getYear()
var locationId = 0;
var locName ="";
var queryURL ="";

function getUserInput() {
  locName = $("#user-input").val()
  queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+locName+"&appid=5495b7f13ab5bdde931c6f4d218ed2e4"

  if (locName) {
    getLocationData() 
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
function getLocationData() {
  for (var i=0; i<jsonData.length; i++) {
    if (jsonData[i].name == locName) {
      locationId = jsonData[i].id;
    }
  }
  console.log(locationId);
}