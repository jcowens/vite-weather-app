import PropTypes from "prop-types";

import DayForecast from "./DayForecast";

const WeeklyForecast = ({ forecast, isCelsius, onDayClick, selectedDate }) => {
  return (
    <div className="weekly-forecast">
      {forecast.map((day, index) => (
        <DayForecast
          key={index}
          day={day}
          isCelsius={isCelsius}
          onDayClick={onDayClick}
          isSelected={day.date === selectedDate}
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
  onDayClick: PropTypes.func.isRequired,
  selectedDate: PropTypes.string,
};

export default WeeklyForecast;
