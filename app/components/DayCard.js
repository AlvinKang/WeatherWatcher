import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

const DayCard = props => {
  return (
    <div className="card">
      <img src={props.img} alt="weather img" />
      <Moment format="dddd, MMM DD">{props.date}</Moment>
      <p>
        {props.lo} / {props.hi}
      </p>
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
