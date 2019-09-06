$.ajaxSetup({
  cache: false
});
$(document).ready(function() {
  $("[name='toggleSwitch']").bootstrapSwitch();

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeather);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function getWeather(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var type = $('#switch-state').bootstrapSwitch('state');
    var metrics;

    switch (type) {
      case false:
        metrics = "imperial";
        break;
      case true:
        metrics = "metric";
        break;
      default:
        metrics = "metric";
        break;
    }

    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=" + metrics + "&APPID=82317e4b67914f87612b77232824abf8", function(data) {
      var city = data.name;
      var country = data.sys.country;
      var temp = data.main.temp;
      var id = data.weather[0].id;
      //var icon = data.weather[0].icon;

      if (metrics == "metric") {
        var tempSystem = ' &deg;C';
      } else {
        tempSystem = ' &deg;F';
      }

      $("#location").text(city + ', ' + country);
      $("#temp").html(temp + tempSystem);
      $("#icon").html('<i class="fa-2x wi wi-owm-day-' + id + '"></i>');
      //$("#icon").html('<img src="http://openweathermap.org/img/w/' + icon + '.png" />');
    });
  };

  getLocation();

  $('#switch-state').on('switchChange.bootstrapSwitch', function() {
    var type = $('#switch-state').bootstrapSwitch('state');
    var metrics;

    switch (type) {
      case false:
        metrics = "imperial";
        break;
      case true:
        metrics = "metric";
        break;
      default:
        metrics = "metric";
        break;
    }
    getLocation();
  });
});