import { React, useState } from 'react';
import { useGeolocated } from 'react-geolocated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';

const Geolocation = () => {
  // This saves coordinates of the users location through useGeolocated and also
  // saves boolean values for whether geolocation is enabled in the browser
  // and also whether the user has allowed access to their location
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  // State variable to save the weather based on the users location data
  const [geoWeather, setGeoWeather] = useState(null);

  // This async function grabs the users location coordinates if they are available
  // and saves them to a variable userCoordinates which is then passed to the weatherAPI
  // this then returns the weather data which is used to set the state variable geoWeather
  // which is then displayed to the user. If an error occurs an alert is sent to the user.

  const fetchGeoWeather = async () => {
    try {
      if (coords) {
        const latitude = coords.latitude;
        const longitude = coords.longitude;
        const userCoordinates = `${latitude},${longitude}`;

        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=5f7b0fc194b34619a69195313242505&q=${userCoordinates}`
        );

        const Geodata = await response.json();
        if (response.ok) {
          setGeoWeather(Geodata);
        }
      }
    } catch (err) {
      alert('Failed to fetch local weather data');
      console.log('Server error', err);
    }
  };

  // The page will use some conditional rendering to display the weather data or an
  // An error message on the browser if the browser does not support geolocation
  // or it was not enabled by the user

  return !isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : coords ? (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6 flex flex-col">
          <button
            onClick={fetchGeoWeather}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 "
          >
            <FontAwesomeIcon
              icon={faLocationCrosshairs}
              className="text-[18px] text-white mr-2"
            />
            {` Local Weather`}
          </button>
          {geoWeather && (
            <div className="text-lg font-medium text-gray-700 bg-blue-100 p-4 rounded-lg shadow-sm space-y-2 flex flex-col items-center">
              <p>City: {geoWeather.location.name}</p>
              <p>Country: {geoWeather.location.country}</p>
              <p>Temperature: {geoWeather.current.temp_c}°C</p>
              <p>Condition: {geoWeather.current.condition.text}</p>
              <img
                src={geoWeather.current.condition.icon}
                alt="weather icon"
                className="w-12 h-12"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div>Getting the location data&hellip; </div>
  );
};

export default Geolocation;
