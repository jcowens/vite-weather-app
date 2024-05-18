import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";

const DayForecast = ({ day, isCelsius }) => {
  const dayOfWeek = format(parseISO(day.date), "EEEE");

  const temp = isCelsius
    ? Math.round(day.day.avgtemp_c)
    : Math.round(day.day.avgtemp_f);

  return (
    <div className="day-forecast">
      <h3>{dayOfWeek}</h3>
      <img src={day.day.condition.icon} alt={day.day.condition.text} />
      <p>
        {temp}
        {isCelsius ? "°C" : "°F"}
      </p>
      <p>{day.day.condition.text}</p>
    </div>
  );
};

DayForecast.propTypes = {
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
  isCelsius: PropTypes.bool.isRequired,
};

export default DayForecast;
