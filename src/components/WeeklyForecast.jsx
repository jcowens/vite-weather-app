import PropTypes from "prop-types";

import DayForecast from "./DayForecast";

const WeeklyForecast = ({ forecast, isCelsius, onDayClick }) => {
  return (
    <div className="weekly-forecast">
      {forecast.map((day, index) => (
        <DayForecast
          key={index}
          day={day}
          isCelsius={isCelsius}
          onDayClick={onDayClick}
        />
      ))}
    </div>
  );
};

WeeklyForecast.propTypes = {
  forecast: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.shape({
        date: PropTypes.string.isRequired,
        day: PropTypes.shape({
          avgtemp_c: PropTypes.number.isRequired,
          avgtemp_f: PropTypes.number.isRequired,
          condition: PropTypes.shape({
            text: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
    })
  ).isRequired,

  isCelsius: PropTypes.bool.isRequired,
  onDayClick: PropTypes.func.isRequired, // Added this line
};

export default WeeklyForecast;
