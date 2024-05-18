import { useEffect, useState, useMemo } from "react";
import Header from "./components/Header";
import TemperatureDisplay from "./components/TemperatureDisplay";
import WeeklyForecast from "./components/WeeklyForecast";
import HourlyGraph from "./components/HourlyTemperatureGraph";
import HourlyWind from "./components/HourlyWind";
import HourlyPrecipitationGraph from "./components/HourlyPrecipitationGraph";
import {
  getCurrentWeather,
  getWeeklyForecast,
  searchLocation,
} from "./services/weatherService";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { debounce } from "@mui/material/utils";
import PropTypes from "prop-types";
import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(false);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedGraph, setSelectedGraph] = useState("temperature");
  const fetchWeatherData = async (location) => {
    const current = await getCurrentWeather(location);
    setCurrentWeather(current);

    const weekly = await getWeeklyForecast(location);
    const today = new Date().toISOString().split("T")[0];
    const filteredForecast = weekly.forecast.forecastday.filter(
      (day) => day.date >= today
    );
    setWeeklyForecast(filteredForecast);
    setHourlyData(filteredForecast[0]?.hour || []); // Set initial hourly data
  };

  useEffect(() => {
    fetchWeatherData("London");
  }, []);

  const fetch = useMemo(
    () =>
      debounce(async (request, callback) => {
        const results = await searchLocation(request);
        callback(results);
      }, 400),
    []
  );

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch(inputValue, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const renderOption = (props, option) => {
    const { ...rest } = props; // Extract the key prop from props
    return (
      <li key={`${option.name}-${option.region}-${option.country}`} {...rest}>
        <Grid container alignItems="center">
          <Grid item sx={{ display: "flex", width: 44 }}>
            <LocationOnIcon sx={{ color: "text.secondary" }} />
          </Grid>
          <Grid
            item
            sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
          >
            <Typography>
              {option.name}, {option.region}, {option.country}
            </Typography>
          </Grid>
        </Grid>
      </li>
    );
  };

  renderOption.propTypes = {
    key: PropTypes.string.isRequired,
    props: PropTypes.object.isRequired,
    option: PropTypes.shape({
      name: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
  };

  return (
    <div className="weather-app">
      <Autocomplete
        className="weather-location-search"
        sx={{ width: "100%", maxWidth: "98%" }}
        getOptionLabel={(option) =>
          typeof option === "string"
            ? option
            : `${option.name}, ${option.region}`
        }
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        noOptionsText="No locations"
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
          if (
            newValue &&
            newValue.name &&
            newValue.region &&
            newValue.country
          ) {
            fetchWeatherData(
              `${newValue.name}, ${newValue.region}, ${newValue.country}`
            );
          }
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Search for a location" fullWidth />
        )}
        renderOption={renderOption}
      />
      {currentWeather && (
        <>
          <Header
            location={currentWeather.location}
            condition={currentWeather.current.condition}
          />
          <TemperatureDisplay
            tempC={currentWeather.current.temp_c}
            tempF={currentWeather.current.temp_f}
            isCelsius={isCelsius}
            setIsCelsius={setIsCelsius}
            current={currentWeather.current}
          />
        </>
      )}
      <div className="graph-buttons">
        <button onClick={() => setSelectedGraph("temperature")}>
          Temperature
        </button>
        <button onClick={() => setSelectedGraph("precipitation")}>
          Precipitation
        </button>
        <button onClick={() => setSelectedGraph("wind")}>Wind</button>
      </div>
      <div className="hourly-graphs">
        {selectedGraph === "temperature" && (
          <HourlyGraph
            data={hourlyData}
            label="Temperature"
            dataKey={isCelsius ? "temp_c" : "temp_f"}
            isCelsius={isCelsius}
            setIsCelsius={setIsCelsius}
          />
        )}
        {selectedGraph === "precipitation" && (
          <HourlyPrecipitationGraph data={hourlyData} />
        )}
        {selectedGraph === "wind" && (
          <HourlyWind data={hourlyData} isCelsius={isCelsius} />
        )}
      </div>
      <WeeklyForecast
        forecast={weeklyForecast}
        isCelsius={isCelsius}
        onDayClick={(day) => setHourlyData(day.hour)}
      />
    </div>
  );
}

export default App;
