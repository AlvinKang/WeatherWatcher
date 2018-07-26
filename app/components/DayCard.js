import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

const DayCard = props => {
  return (
    <div className="card hvr-underline-from-center">
      <div className="card-label">
        <span className="card-label-weekday">
          <Moment format="dddd">{props.date}</Moment>
        </span>
        <br />
        <Moment format="MMM DD">{props.date}</Moment>
      </div>
      <div className="card-body">
        <img src={props.img} alt="weather img" />
        <p>
          <span className="hi-temp">{props.hi}&deg;</span> {"  "}
          {props.lo}&deg;
          <br />
          {props.description}
        </p>
      </div>
    </div>
  );
};

DayCard.propTypes = {
  img: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  hi: PropTypes.number.isRequired,
  lo: PropTypes.number.isRequired
};

export default DayCard;
