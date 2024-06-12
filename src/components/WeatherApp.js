import React, { useState } from 'react';

const WeatherApp = () => {
  // State variables to save the city from user input and weather data retrieved from API
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  // Set up an async function to grab the data from the weather API based on user input of location
  // The weather data is then saved in state variable weather
  // If request fails an error message is sent as an alert to the user
  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=5f7b0fc194b34619a69195313242505&q=${city}`
      );
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
      }
    } catch (err) {
      alert('Failed to fetch weather data');
      console.log('Server error', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6 flex flex-col">
        <input
          type="text"
          placeholder="Enter a city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-center"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Get Weather
        </button>
        {weather && (
          <div className="text-lg font-medium text-gray-700 bg-blue-100 p-4 rounded-lg shadow-sm space-y-2 flex flex-col items-center">
            <p>City: {weather.location.name}</p>
            <p>Country: {weather.location.country}</p>
            <p>Temperature: {weather.current.temp_c}°C</p>
            <p>Condition: {weather.current.condition.text}</p>
            <img
              src={weather.current.condition.icon}
              alt="weather icon"
              className="w-12 h-12"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
