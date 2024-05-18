# Vite Weather App

This project is a weather application built with React and Vite. It fetches and displays current weather, weekly forecasts, and hourly data for selected locations using WeatherAPI.com.

## Features

- **Current Weather**: Displays current temperature, condition, and additional info.
- **Weekly Forecast**: Shows a 7-day weather forecast.
- **Hourly Data**: Provides hourly temperature, precipitation, and wind data.
- **Location Search**: Autocomplete search for locations with saved locations feature.
- **Unit Toggle**: Switch between Celsius and Fahrenheit.

## Example

![vite-weather-app-jcowens netlify app_2024-05-18_14_47_25](https://github.com/jcowens/vite-weather-app/assets/13876469/2859b981-961e-49bc-a0bd-296147cb5b49)

*Figure: Screenshot of the Vite Weather App showing current weather, weekly forecast, and hourly data.*

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jcowens/vite-weather-app.git
   cd vite-weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your WeatherAPI key:
   ```env
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

- **Search for a Location**: Use the search bar to find and select a location. The selected location will be saved in local storage.
- **View Weather Data**: The app displays current weather, weekly forecast, and hourly data for the selected location.
- **Toggle Units**: Switch between Celsius and Fahrenheit using the unit toggle.

## Dependencies

- React
- Vite
- Material UI
- Axios
- Date-fns
- React Chart.js 2

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License.

