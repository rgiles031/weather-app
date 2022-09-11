// things to fix code
//1. some "lets" at the bottom should be in functions
//2. add conversion to farenheit
//3. make weather icons change with city
//4. DONE - fix "current" button position
//5. general tidy
//6. DONE - add "last updated" to time
//7. add city on load
//8. DONE - add real time precipitation (changed to humidity)
//9. DONE - fix time/date and add 0s

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

function displayWeather(response) {
  let temp = document.querySelector("#current-temp");
  let humiditiy = document.querySelector("#current-humiditiy");
  let h1 = document.querySelector("h1");

  temp.innerHTML = `${Math.round(response.data.main.temp)}`;
  humiditiy.innerHTML = `${Math.round(response.data.main.humidity)}`;
  h1.innerHTML = response.data.name;
  formatDate();
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

// function retrievePosition(position) {
//   let apiKey = `b773b1f10cb8a98f50537146605ab6f2`;
//   let lat = position.coords.latitude;
//   let lon = position.coords.longitude;
//   let currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
//   axios.get(currentApiUrl).then(displayWeather);
//}

// function getLocation() {
//   navigator.geolocation.getCurrentPosition(retrievePosition);
// }

let citySubmitted = document.querySelector("#city-form");
citySubmitted.addEventListener("submit", changeCity);

//let currentLocationClick = document.querySelector("#current-click");
//currentLocationClick.addEventListener("click", getLocation);

search("London");
