import "./App.css";
import InputForm from "./InputForm/InputForm";
import DisplayWeather from "./DisplayWeather/DisplayWeather";
import logo from "./images/icon.png";
import Footer from "./Footer/Footer";
import ViewWeather from "./ViewWeather/ViewWeather";
import React, { useState } from "react";

function App() {
  //displaying multiple views on button click.
  const [selectedCityCode, setSelectedCityCode] = useState(null);
  const [showViewWeather, setShowViewWeather] = useState(false);
  const [showDisplayWeather, setShowDisplayWeather] = useState(true);

  const handleCityBoxClick = (cityCode) => {
    setSelectedCityCode(cityCode);
    setShowViewWeather(true);
    setShowDisplayWeather(false);
  };
  const handleBackButtonClick = () => {
    setShowViewWeather(false);
    setShowDisplayWeather(true);
  };
  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt="Logo" />
        <h1>Weather App</h1>
      </div>
      <div>
        {showDisplayWeather && (
          <div className="data-container">
            <InputForm />
            <DisplayWeather
              onCityBoxClick={handleCityBoxClick}
              hideDisplayWeather={() => setShowDisplayWeather(false)}
            />
          </div>
        )}
      </div>
      {/* retrieving city code and if images available can be altered */}
      {showViewWeather && selectedCityCode && (
        <ViewWeather
          cityCode={selectedCityCode}
          onBackButtonClick={handleBackButtonClick}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
