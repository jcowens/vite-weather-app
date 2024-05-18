import PropTypes from "prop-types";
import format from "date-fns/format";

const HourlyWind = ({ data, isCelsius }) => {
  const filteredData = data.filter((_, index) => index % 3 === 0); // Update every 3 hours
  return (
    <div className="hourly-wind">
      {filteredData.map((hour, index) => (
        <div key={index} className="wind-item">
          <img
            src="/1.png"
            alt="Wind Direction"
            style={{ transform: `rotate(${hour.wind_degree}deg)` }}
          />
          <div>
            <small>
              {isCelsius ? `${hour.wind_kph} kph` : `${hour.wind_mph} mph`}
            </small>
          </div>
          <div>
            <small>{format(new Date(hour.time), "h:mm:a")}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

HourlyWind.propTypes = {
  data: PropTypes.array.isRequired,
  isCelsius: PropTypes.bool.isRequired,
};

export default HourlyWind;
