var queryURL = "https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=5495b7f13ab5bdde931c6f4d218ed2e4"


$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });