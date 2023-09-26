import "./ViewWeather.css";
import React, { useEffect, useState } from "react";
import fetchWeatherDataForCities from "../DataService";
import {
  FaArrowLeft,
  FaCloud,
  FaSun,
  FaCloudRain,
  FaMixcloud,
} from "react-icons/fa";

//declaring array for weather conditions. All are not available.
const weatherIcons = {
    clouds: <FaCloud />,
    clear: <FaSun />,
    rain: <FaCloudRain />,
    mist: <FaMixcloud />,
  };

// getting current DateTime
function getCurrentFormattedTime() {
  const now = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    month: "short",
    day: "2-digit",
  };
  return now.toLocaleString("en-US", options);
}

function convertTimestampToTime(timestamp) {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${
    hours >= 12 ? "pm" : "am"
  }`;

  return formattedTime;
}

function capitalizeWords(text) {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function ViewWeather({ cityCode, onBackButtonClick }) {
  const [weatherData, setWeatherData] = useState(null);
  const getWeatherIcon = (description) => {
    return weatherIcons[description.toLowerCase()] || null;
  };
  useEffect(() => {
    fetchWeatherDataForCities([cityCode])
      .then((data) => {
        setWeatherData(data.list);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [cityCode]);

  return (
    <div className="viewContainer">
      <div className="viewBox">
        {weatherData ? (
          <div>
            <button className="back-button" onClick={onBackButtonClick}>
              <FaArrowLeft />
            </button>
            <div className="cityTimeView">
              <div className="cityName">
                {weatherData[0].name}, {weatherData[0].sys.country}
              </div>

              <div className="datTime">{getCurrentFormattedTime()}</div>
            </div>
            <div className="wDescriptionView">
              {getWeatherIcon(weatherData[0].weather[0].main)}
              <br />
              {capitalizeWords(weatherData[0].weather[0].description)}
            </div>
            <div className="tempValuesView">
              <div className="tempView">
                {Math.round(weatherData[0].main.temp)}°c
              </div>
              <div className="minMaxView">
                Temp Min: {Math.round(weatherData[0].main.temp_min)}°c <br />
                Temp Max: {Math.round(weatherData[0].main.temp_max)}°c
              </div>
            </div>

            <div className="presHumBlockView">
              <p>
                <strong>Pressure:</strong> {weatherData[0].main.pressure}hPa
              </p>
              <p>
                <strong>Humidity:</strong> {weatherData[0].main.humidity}%
              </p>
              <strong>Visibility:</strong>{" "}
              {(weatherData[0].visibility / 1000).toFixed(1)}km
            </div>
            <div className="speedDegView">
              <p>
                {weatherData[0].wind.speed}m/s {weatherData[0].wind.deg} Degree{" "}
              </p>
            </div>
            <div className="sunRiSeView">
              <p>
                <strong>Sunrise:</strong>{" "}
                {convertTimestampToTime(weatherData[0].sys.sunrise)}
              </p>
              <p>
                <strong>Sunset:</strong>{" "}
                {convertTimestampToTime(weatherData[0].sys.sunset)}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
}

export default ViewWeather;
