const axios = require("axios");

// API credentials
const APP_ID = "37f0769077b6b602e8fca3331960152e";

const params = `units=imperial&APPID=${APP_ID}`;

// Current weather
// Example:
// http://api.openweathermap.org/data/2.5/weather?q=Las%20Vegas,us&APPID=37f0769077b6b602e8fca3331960152e
function getCurrentWeather(location) {
  const url = window.encodeURI(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&${params}`
  );

  return axios
    .get(url)
    .then(res => res.data)
    .catch(err => handleError);
}

// 5-day forecast
// Example:
// api.openweathermap.org/data/2.5/forecast?q=las%20vegas&APPID=37f0769077b6b602e8fca3331960152e
function getForecast(location) {
  const url = window.encodeURI(
    `http://api.openweathermap.org/data/2.5/forecast?q=${location}&${params}`
  );

  console.log(url);

  return axios.get(url);
}

module.exports = {
  getCurrentWeather,
  getForecast
};
