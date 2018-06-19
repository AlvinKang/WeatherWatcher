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
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

// 5-day forecast
// Example:
// api.openweathermap.org/data/2.5/forecast?q=las%20vegas&APPID=37f0769077b6b602e8fca3331960152e
function getForecast(location) {
  const url = window.encodeURI(
    `http://api.openweathermap.org/data/2.5/forecast?q=${location}&${params}`
  );

  return axios.get(url);
}

module.exports = {
  getCurrentWeather,
  getForecast
};
