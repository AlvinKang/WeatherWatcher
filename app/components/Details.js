import React from "react";
import { Redirect, Link } from "react-router-dom";
import Moment from "react-moment";

export default props => {
  // If not coming from forecast page, redirect to home
  if (!props.location.state) {
    return <Redirect to="/" />;
  }

  const {
    from,
    lo,
    hi,
    icon,
    humidity,
    description,
    date
  } = props.location.state;

  const { location } = props.match.params;

  return (
    <div className="details-container">
      <div className="details-label">
        <span className="details-label-weekday">
          <Moment format="dddd, MMMM DD">{date}</Moment>
        </span>
      </div>
      <h2>@ {location}</h2>

      <img src={icon} alt="weather img" />

      <p className="temperature">
        H {hi}&deg; L {lo}&deg;
      </p>
      <p>
        {description.toUpperCase()}
        <br />
        Humidity: {humidity}%
      </p>

      <Link to={from} className="link">
        <button className="button"> Back to Forecast </button>
      </Link>
    </div>
  );
};
