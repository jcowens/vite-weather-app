import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const BASE_URL = "http://api.weatherapi.com/v1";

export const getCurrentWeather = async (location) => {
  const response = await axios.get(
    `${BASE_URL}/current.json?key=${API_KEY}&q=${location}`
  );

  return response.data;
};

export const getWeeklyForecast = async (location) => {
  const response = await axios.get(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=7`
  );

  return response.data;
};

export const searchLocation = async (query) => {
  const response = await axios.get(`${BASE_URL}/search.json?key=${API_KEY}&q=${query}`);
  return response.data.map((result) => ({
    name: result.name,
    region: result.region,
    country: result.country,
  }));
};
