import React from "react";
import { getForecast } from "../utils/api";
import queryString from "query-string";
import DayCard from "./DayCard";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { organizeByDay, combineInfoByDay } from "../utils/forecastHelper";

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
    getForecast(location)
      .then(res => res.data)
      .then(res => {
        // If api call is successful
        // Push forecast objects into state array

        // Sort forecast by datetime
        const forecast = combineInfoByDay(organizeByDay(res.list)).sort(
          (a, b) => a.dt - b.dt
        );

        // If today's forecast discrepency is too small, throw it out
        const ignoreTodaysForecast =
          forecast[0].temps[1] - forecast[0].temps[0] < 6;
        const modifiedForecast = ignoreTodaysForecast
          ? forecast.slice(1)
          : forecast.slice(0);

        this.setState({
          location: res.city.name,
          forecast: modifiedForecast,
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

  render() {
    const { loading, location, forecast } = this.state;
    const { isError, errMsg } = this.state.error;

    return (
      <div
        className="forecast-container"
        style={loading || isError ? { justifyContent: "center" } : null}
      >
        {loading ? (
          <Loader />
        ) : isError ? (
          <h1>{errMsg}</h1>
        ) : (
          <div>
            <h1>
              Forecast for{" "}
              <span style={{ fontWeight: "700", color: "#330033" }}>
                {location}
              </span>
            </h1>
            <div className="row">
              {forecast.map(day => {
                return (
                  <Link
                    className="link card-link"
                    to={{
                      pathname: `/details/${location}`,
                      state: {
                        from: this.props.location,
                        lo: day.temps[0],
                        hi: day.temps[1],
                        icon: require(`../images/weather-icons/${
                          day.icon
                        }.svg`),
                        humidity: day.humidity,
                        description: day.description,
                        date: day.dt_text
                      }
                    }}
                    key={day.dt}
                  >
                    <DayCard
                      img={require(`../images/weather-icons/${day.icon}.svg`)}
                      date={day.dt_text}
                      key={day.dt}
                      lo={day.temps[0]}
                      hi={day.temps[1]}
                      description={day.description}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Forecast;
