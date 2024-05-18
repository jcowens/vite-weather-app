import PropTypes from "prop-types";

const TemperatureDisplay = ({
  tempC,
  tempF,
  isCelsius,
  setIsCelsius,
  current,
}) => {
  const temp = isCelsius ? Math.round(tempC) : Math.round(tempF);
  const unit = isCelsius ? "°C" : "°F";
  const iconUrl = current.condition.icon.replace("64x64", "128x128");

  return (
    <div className="temperature-display">
      <div className="temperature">
        <h2>
          {temp}
          {unit}
        </h2>

        <div className="unit-toggle">
          <span
            className={isCelsius ? "selected" : ""}
            onClick={() => setIsCelsius(true)}
          >
            °C
          </span>{" "}
          /
          <span
            className={!isCelsius ? "selected" : ""}
            onClick={() => setIsCelsius(false)}
          >
            °F
          </span>
        </div>
      </div>
      <img src={iconUrl} alt="Weather Icon" width="128" height="128" />
      <div className="additional-info">
        <div>
          <small>
            Precipitation: {isCelsius ? current.precip_mm : current.precip_in}
            {isCelsius ? " mm" : " in"}
          </small>
        </div>
        <div>
          <small>Humidity: {current.humidity}%</small>
        </div>
        <div>
          <small>
            Wind:{" "}
            {isCelsius ? `${current.wind_kph} kph` : `${current.wind_mph} mph`}
          </small>
        </div>
      </div>
    </div>
  );
};

TemperatureDisplay.propTypes = {
  tempC: PropTypes.number.isRequired,
  tempF: PropTypes.number.isRequired,
  isCelsius: PropTypes.bool.isRequired,
  setIsCelsius: PropTypes.func.isRequired,
  current: PropTypes.object.isRequired,
};

export default TemperatureDisplay;
