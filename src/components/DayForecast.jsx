import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";

const DayForecast = ({ day, isCelsius, onDayClick }) => {
  const dayOfWeek = format(parseISO(day.date), "EEEE");

  const highTemp = isCelsius
    ? Math.round(day.day.maxtemp_c)
    : Math.round(day.day.maxtemp_f);

  const lowTemp = isCelsius
    ? Math.round(day.day.mintemp_c)
    : Math.round(day.day.mintemp_f);

  return (
    <div className="day-forecast" onClick={() => onDayClick(day)}>
      <h3>{dayOfWeek}</h3>
      <img src={day.day.condition.icon} alt={day.day.condition.text} />
      <p>
        <strong>{highTemp}{isCelsius ? "°C" : "°F"}</strong>
      </p>
      <p>
        {lowTemp}{isCelsius ? "°C" : "°F"}
      </p>
    </div>
  );
};

DayForecast.propTypes = {
  day: PropTypes.shape({
    date: PropTypes.string.isRequired,
    day: PropTypes.shape({
      maxtemp_c: PropTypes.number.isRequired,
      maxtemp_f: PropTypes.number.isRequired,
      mintemp_c: PropTypes.number.isRequired,
      mintemp_f: PropTypes.number.isRequired,
      condition: PropTypes.shape({
        text: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  isCelsius: PropTypes.bool.isRequired,
  onDayClick: PropTypes.func.isRequired,
};

export default DayForecast;
