function displayWeather(response) {
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = `${Math.round(response.data.main.temp)}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  console.log(response);
}

function changeCity(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input");
  let apiKey = `b773b1f10cb8a98f50537146605ab6f2`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function retrievePosition(position) {
  let apiKey = `b773b1f10cb8a98f50537146605ab6f2`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(currentApiUrl).then(displayWeather);
  console.log("currentApiUrl");
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

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
let currentMinutes = now.getMinutes();

let h3 = document.querySelector("h3");
h3.innerHTML = `${currentDay}, ${currentHour}:${currentMinutes}`;

let citySubmitted = document.querySelector("#city-form");
citySubmitted.addEventListener("submit", changeCity);

let currentLocationClick = document.querySelector("#current-click");
currentLocationClick.addEventListener("click", getLocation);
