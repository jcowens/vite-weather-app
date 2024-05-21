import { useEffect, useState, useMemo } from "react";
import Header from "./components/Header";
import TemperatureDisplay from "./components/TemperatureDisplay";
import WeeklyForecast from "./components/WeeklyForecast";
import HourlyGraph from "./components/HourlyTemperatureGraph";
import HourlyWind from "./components/HourlyWind";
import HourlyPrecipitationGraph from "./components/HourlyPrecipitationGraph";
import PrecipitationMap from "./components/PrecipitationMap";
import {
  getCurrentWeather,
  getWeeklyForecast,
  searchLocation,
} from "./services/weatherService";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
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
  const [selectedDate, setSelectedDate] = useState(null);
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  const fetchWeatherData = async (location) => {
    const current = await getCurrentWeather(location);
    setCurrentWeather(current);

    const weekly = await getWeeklyForecast(location);
    const today = new Date().toISOString().split("T")[0];
    const filteredForecast = weekly.forecast.forecastday.filter(
      (day) => day.date >= today
    );
    setWeeklyForecast(filteredForecast);
    setHourlyData(filteredForecast[0]?.hour || []);
  };

  useEffect(() => {
    const savedLocations =
      JSON.parse(localStorage.getItem("savedLocations")) || [];
    setOptions(savedLocations);
  }, []);

  useEffect(() => {
    setIsAppLoaded(true);
  }, []);

  useEffect(() => {
    if (currentWeather) {
      const temp = isCelsius
        ? currentWeather.current.temp_c
        : currentWeather.current.temp_f;
      const unit = isCelsius ? "°C" : "°F";
      document.title = `${Math.round(temp)}${unit} in ${
        currentWeather.location.name
      }, ${currentWeather.location.region}`;
      const link = document.querySelector("link[rel~='icon']");
      if (link) {
        link.href = currentWeather.current.condition.icon;
      }
    }
  }, [currentWeather, isCelsius]);

  useEffect(() => {
    fetchWeatherData("Seattle");
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
      setOptions(
        value
          ? [value]
          : JSON.parse(localStorage.getItem("savedLocations")) || []
      );
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
    const savedLocations =
      JSON.parse(localStorage.getItem("savedLocations")) || [];
    const isSaved = savedLocations.some(
      (savedOption) =>
        `${savedOption.name},${savedOption.region},${savedOption.country}` ===
        `${option.name},${option.region},${option.country}`
    );

    return (
      <li {...props}>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              {`${option.name}, ${option.region}, ${option.country}`}
              {isSaved && " (Saved)"}
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
    <div id="weather-app" className="weather-app">
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
          if (
            newValue &&
            newValue.name &&
            newValue.region &&
            newValue.country
          ) {
            const locationKey = `${newValue.name},${newValue.region},${newValue.country}`;
            const savedLocations =
              JSON.parse(localStorage.getItem("savedLocations")) || [];
            const isDuplicate = savedLocations.some(
              (option) =>
                `${option.name},${option.region},${option.country}` ===
                locationKey
            );

            if (!isDuplicate) {
              const updatedLocations = [newValue, ...savedLocations];
              localStorage.setItem(
                "savedLocations",
                JSON.stringify(updatedLocations)
              );
            }

            setValue(newValue);
            fetchWeatherData(
              `${newValue.name}, ${newValue.region}, ${newValue.country}`
            );
          } else {
            setValue(null);
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
        <button
          className={selectedGraph === "temperature" ? "active" : ""}
          onClick={() => setSelectedGraph("temperature")}
        >
          Temperature
        </button>
        <button
          className={selectedGraph === "precipitation" ? "active" : ""}
          onClick={() => setSelectedGraph("precipitation")}
        >
          Precipitation
        </button>
        <button
          className={selectedGraph === "wind" ? "active" : ""}
          onClick={() => setSelectedGraph("wind")}
        >
          Wind
        </button>
        <button
          className={selectedGraph === "map" ? "active" : ""}
          onClick={() => setSelectedGraph("map")}
        >
          Live Map
        </button>
      </div>
      {isAppLoaded && (
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
          {selectedGraph === "map" && (
            <PrecipitationMap
              lat={currentWeather.location.lat}
              lon={currentWeather.location.lon}
            />
          )}
        </div>
      )}
      <WeeklyForecast
        forecast={weeklyForecast}
        isCelsius={isCelsius}
        onDayClick={(day) => {
          setHourlyData(day.hour);
          setSelectedDate(day.date);
        }}
        selectedDate={selectedDate}
      />
    </div>
  );
}

export default App;
