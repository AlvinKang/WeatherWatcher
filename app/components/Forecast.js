const React = require("react");
const api = require("../utils/api");
import queryString from "query-string";
import DayCard from "./DayCard";

// @returns object {day : [hour forecast1, hour forecast2, ...]}
function organizeByDay(list) {
  return list.reduce((obj, forecast) => {
    // get day
    const day = forecast.dt_txt.split(" ")[0].split("-")[2];
    if (!obj[day]) {
      obj[day] = [forecast];
    } else {
      obj[day].push(forecast);
    }
    return obj;
  }, {});
}

// Get weather description
function getWeatherDescByDay(organized) {
  const descs = {};

  Object.keys(organized).forEach(day => {
    const forecasts = organized[day];
    const desc = forecasts.map(forecast => forecast.weather[0].description);
    // Pick middle description
    descs[day] = desc[Math.floor(desc.length / 2)];
  });

  return descs;
}

function getDtByDay(organized) {
  const dts = {};

  Object.keys(organized).forEach(day => {
    const forecasts = organized[day];
    const dt = forecasts.map(forecast => forecast.dt);
    // Pick middle dt
    dts[day] = dt[Math.floor(dt.length / 2)];
  });
  return dts;
}

// Get date_text
function getDateTextByDay(organized) {
  const dTexts = {};

  Object.keys(organized).forEach(day => {
    const forecasts = organized[day];
    const dText = forecasts.map(forecast => forecast.dt_txt);
    // Pick middle dtext
    dTexts[day] = dText[Math.floor(dText.length / 2)];
  });

  return dTexts;
}

// Get humidity
function getHumidityByDay(organized) {
  const humiditys = {};

  Object.keys(organized).forEach(day => {
    const forecasts = organized[day];
    const humidity = forecasts.map(forecast => forecast.main.humidity);
    // Pick middle humidity value
    humiditys[day] = humidity[Math.floor(humidity.length / 2)];
  });

  return humiditys;
}

// @returns object {day: icon_string}
function getIconByDay(organized) {
  const icons = {};

  Object.keys(organized).forEach(day => {
    const forecasts = organized[day];
    const dayIcons = forecasts.map(forecast => forecast.weather[0].icon);
    // Pick middle icon
    icons[day] = dayIcons[Math.floor(dayIcons.length / 2)].replace("n", "d");
  });

  return icons;
}

// @returns object {day: [min_temp, max_temp]}
function getMinMaxTempByDay(organized) {
  const temps = {};

  Object.keys(organized).forEach(day => {
    const forecasts = organized[day];
    const dayTemps = forecasts.map(forecast => forecast.main.temp);
    const minTemp = Math.min(...dayTemps);
    const maxTemp = Math.max(...dayTemps);
    temps[day] = [Math.round(minTemp), Math.round(maxTemp)];
  });

  return temps;
}

/**
 * Fills each forecast day with temperature and icon.
 *
 * @param {Object} organized - result from organizeByDay()
 * @returns {Object[]} with format of:
 *  {
 *    dt: {number},
 *    dt_text: {string},
 *    icon: {string},
 *    temps: {number[]},
 *    humidity: {number},
 *    description: {string},
 *  }
 */
function combineInfoByDay(organized) {
  const days = [];

  const dts = getDtByDay(organized);
  const dt_texts = getDateTextByDay(organized);
  const icons = getIconByDay(organized);
  const temps = getMinMaxTempByDay(organized);
  const humiditys = getHumidityByDay(organized);
  const descriptions = getWeatherDescByDay(organized);

  Object.keys(icons).forEach(day => {
    const dayInfo = {
      dt: dts[day],
      dt_text: dt_texts[day],
      icon: icons[day],
      temps: temps[day],
      humidity: humiditys[day],
      description: descriptions[day]
    };
    days.push(dayInfo);
  });

  return days;
}

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      location: "",
      forecast: [],
      error: {
        isError: false,
        errMsg: ""
      }
    };
  }

  componentDidMount() {
    // Retrieve the search query from link
    const search = this.props.location.search;
    const location = queryString.parse(search).location;

    // Call api
    api
      .getForecast(location)
      .then(res => res.data)
      .then(res => {
        // If api call is successful
        // Push forecast objects into state array
        this.setState({
          location: res.city.name,
          forecast: combineInfoByDay(organizeByDay(res.list)),
          loading: false
        });
      })
      .catch(error => {
        // Handle error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          this.setState({
            error: {
              errMsg: "Error: " + error.response.data.message,
              isError: true
            },
            loading: false
          });
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
          this.setState({
            error: {
              errMsg: "Error: No response received.",
              isError: true
            },
            loading: false
          });
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          this.setState({
            error: {
              errMsg: "There was an error. Please try again.",
              isError: true
            },
            loading: false
          });
        }
      });
  }

  handleSubmit(event) {
    // Prevent default submit
    event.preventDefault();
    // TODO: Call API, route to next page
    const results = {};
    api.getForecast(this.state.searchValue).then(data => {
      console.log(data);
    });
  }

  // AJAX fetch on mount to get 5 day forecast (push 5 objects into array)
  // For each forecast object, create forecast detail card
  // Update the state with 5 Forecast detail cards

  render() {
    return (
      <div className="forecast-container">
        {this.state.loading ? (
          <h1>Loading</h1>
        ) : this.state.error.isError ? (
          <h1>{this.state.error.errMsg}</h1>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h1>{this.state.location}</h1>
            {this.state.forecast.map(day => {
              return (
                <DayCard
                  img={require(`../images/weather-icons/${day.icon}.svg`)}
                  date={day.dt_text}
                  key={day.dt}
                  lo={day.temps[0]}
                  hi={day.temps[1]}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

module.exports = Forecast;
