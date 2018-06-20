import React from "react";
import { Redirect } from "react-router-dom";
import Moment from "react-moment";

export default props => {
  // If not coming from forecast page, redirec to home
  if (!props.location.state) {
    return <Redirect to="/" />;
  }

  const { lo, hi, icon, humidity, description, date } = props.location.state;

  const { location } = props.match.params;

  return (
    <div className="details-container">
      <h1>
        <Moment format="dddd, MMM DD">{date}</Moment>
      </h1>
      <h2>@ {location}</h2>

      <img src={icon} alt="weather img" />

      <p
        style={{
          fontSize: "2.3rem",
          marginBottom: "10px"
        }}
      >
        H {hi}&deg; L {lo}&deg;{" "}
      </p>
      <p>
        {description.toUpperCase()}
        <br />
        Humidity: {humidity}%
      </p>
    </div>
  );
};
