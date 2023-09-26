import React, { Component } from "react";
import "./DisplayWeather.css";
import jsonData from "../data/cities.json";
import fetchWeatherDataForCities from "../DataService";
import image1 from "../images/red.png";
import image2 from "../images/orange.png";
import image3 from "../images/green.png";
import image4 from "../images/blue.png";
import image5 from "../images/purple.png";
import { FaCloud, FaSun, FaCloudRain, FaMixcloud } from "react-icons/fa";

class DisplayWeather extends Component {
  constructor() {
    super();
    this.state = {
      cities: [],
      cityWeatherData: [],
      currentDateTime: null,
    };
  }

  componentDidMount() {
    this.setState({ cities: jsonData.List });
    const cityCodes = jsonData.List.map((city) => city.CityCode);
    const currentDateTime = this.getCurrentFormattedTime();
    this.setState({ currentDateTime });
    fetchWeatherDataForCities(cityCodes)
      .then((weatherData) => {
        const cityWeatherData = weatherData.list;

        this.setState({ cityWeatherData: cityWeatherData });
      })
      .catch((error) => {});
  }

  getCurrentFormattedTime() {
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
  //further implementation required , implementation was not specified.
  removeCity(index) {
    const updatedCities = [
      ...this.state.cities.slice(0, index),
      ...this.state.cities.slice(index + 1),
    ];
    this.setState({ cities: updatedCities });
  }

  // Selecting random Image
  setRandomImage() {
    const imageArray = [image1, image2, image3, image4, image5];

    // // this.setState({ randomImage });
    return imageArray[Math.floor(Math.random() * imageArray.length)];
  }

  capitalizeWords(text) {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  getWeatherIcon = (description) => {
    const weatherIcons = {
      clouds: <FaCloud />,
      clear: <FaSun />,
      rain: <FaCloudRain />,
      mist: <FaMixcloud />,
    };
    return weatherIcons[description.toLowerCase()] || null;
  };

  render() {
    const { currentDateTime, cityWeatherData } = this.state;

    function convertTimestampToTime(timestamp) {
      const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

      const hours = date.getHours();
      const minutes = date.getMinutes();

      const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${
        hours >= 12 ? "pm" : "am"
      }`;

      return formattedTime;
    }
    return (
      <div>
        <div className="city-grid">
          {cityWeatherData.map((city, index) => (
            <div
              key={index}
              className="city-box"
              style={{
                backgroundImage: `url(${this.setRandomImage()})`,
              }}
              onClick={() => this.props.onCityBoxClick(city.id)}
            >
              <button
                className="close-button"
                onClick={() => this.removeCity(index)}
              >
                X
              </button>
              <div className="cityTime">
                <div className="cityName">
                  {city.name}, {city.sys.country}
                </div>

                <div className="datTime">{currentDateTime}</div>
                <div className="wDescription">
                  {this.getWeatherIcon(city.weather[0].main)}{" "}
                  {this.capitalizeWords(city.weather[0].description)}
                </div>
              </div>
              <div className="tempValues">
                <div className="temp">{Math.round(city.main.temp)}°c</div>
                <div className="minMax">
                  Temp Min: {Math.round(city.main.temp_min)}°c <br />
                  Temp Max: {Math.round(city.main.temp_max)}°c
                </div>
              </div>

              <div className="presHumBlock">
                <p>
                  <strong>Pressure:</strong> {city.main.pressure}hPa
                </p>
                <p>
                  <strong>Humidity:</strong> {city.main.humidity}%
                </p>
                <strong>Visibility:</strong>{" "}
                {(city.visibility / 1000).toFixed(1)}km
              </div>
              <div className="speedDeg">
                <p>
                  {city.wind.speed}m/s {city.wind.deg} Degree{" "}
                </p>
              </div>
              <div className="sunRiSe">
                <p>
                  <strong>Sunrise:</strong>{" "}
                  {convertTimestampToTime(city.sys.sunrise)}
                </p>
                <p>
                  <strong>Sunset:</strong>{" "}
                  {convertTimestampToTime(city.sys.sunset)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default DisplayWeather;
