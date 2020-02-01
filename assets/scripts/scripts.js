var d = new Date();
var month = d.getMonth()+1
var nd = month+"/"+d.getDate()+"/"+ d.getYear()
function getUserInput() {
  var locationId = $("#user-input").val()
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+locationId+"&appid=5495b7f13ab5bdde931c6f4d218ed2e4"
  if (locationId) {
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