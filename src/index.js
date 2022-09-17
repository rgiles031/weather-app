function formatDate() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[now.getDay()];
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let h3 = document.querySelector("h3");
  h3.innerHTML = `Last updated: ${currentDay}, ${currentHour}:${currentMinutes}`;
}

function formatForecastDay(dt) {
  let now = new Date(dt * 1000);
  let shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return shortDays[now.getDay()];
}

function displayForecast(response) {
  console.log(response.data.list);
  let insertForecast = document.querySelector("#insert-forecast");
  let forecastHTML = `<div class="row">`;

  let forecastArray = response.data.list;
  forecastArray.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 day-of-week">
       <h5>${formatForecastDay(forecastDay.dt)}</h5>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt="forecast weather icon"
          class="forecast-icon"
         />
        <div>
          <span class="max">${Math.round(forecastDay.main.temp_max)}°</span>
          <span class="min">${Math.round(forecastDay.main.temp_min)}°</span>
        </div>
       </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  insertForecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let forecastLon = coordinates.lon;
  let forecastLat = coordinates.lat;
  let forecastApiKey = `b773b1f10cb8a98f50537146605ab6f2`;
  let forecastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${forecastLat}&lon=${forecastLon}&appid=${forecastApiKey}&units=metric`;
  axios.get(forecastApi).then(displayForecast);
}

function displayWeather(response) {
  let temp = document.querySelector("#current-temp");
  let humiditiy = document.querySelector("#current-humiditiy");
  let h1 = document.querySelector("h1");
  let weatherElement = document.querySelector("#weather-icon");
  celciusTemp = response.data.main.temp;

  temp.innerHTML = `${Math.round(celciusTemp)}`;
  humiditiy.innerHTML = `${Math.round(response.data.main.humidity)}`;
  h1.innerHTML = response.data.name;
  weatherElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  formatDate();
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = `b773b1f10cb8a98f50537146605ab6f2`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function retrievePosition(position) {
  let apiKey = `b773b1f10cb8a98f50537146605ab6f2`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(currentApiUrl).then(displayWeather);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function convertToFahrenheit(event) {
  event.preventDefault;
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = Math.round(fahrenheitTemp);
  fahrenheitClick.classList.add("fahrenheit");
  celsiusClick.classList.remove("celsius");
}

function convertToCelcius(event) {
  event.preventDefault;
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = Math.round(celciusTemp);
  fahrenheitClick.classList.remove("fahrenheit");
  celsiusClick.classList.add("celsius");
}

let celciusTemp = null;

let fahrenheitClick = document.querySelector("#fahrenheit-click");
fahrenheitClick.addEventListener("click", convertToFahrenheit);

let celsiusClick = document.querySelector("#celsius-click");
celsiusClick.addEventListener("click", convertToCelcius);

let citySubmitted = document.querySelector("#city-form");
citySubmitted.addEventListener("submit", changeCity);

let currentLocationClick = document.querySelector("#current-click");
currentLocationClick.addEventListener("click", getLocation);

search("London");
