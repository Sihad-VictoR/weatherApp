import React, { useState } from "react";
import "./InputForm.css";

// not implemented due to the requirements
const InputForm = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonSubmit = () => {
    console.log("Input Value:", inputValue);
  };

  return (
    <div className="input-form">
      <input
        type="text"
        placeholder="Enter a city"
        value={inputValue}
        className="textInput"
        onChange={handleInputChange}
      />
      <button className="textInputBtn" onClick={handleButtonSubmit}>
        Add City
      </button>
    </div>
  );
};

export default InputForm;
