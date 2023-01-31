import React, { useState } from "react";

const TravelForm = (props) => {
  const [distance, setDistance] = useState("");
  const [passengers, setPassengers] = useState("");

  const handleChange = (setFunction) => {
    return (event) => {
      setFunction(event.target.value);
    };
  };

  return (
    <div id="travelForm">
      <form>
        <input
          data-cy="distance"
          type="text"
          placeholder="Distance in km"
          min="0.0"
          max="20000.0"
          value={distance}
          onChange={handleChange(setDistance)}
        />

        <input
          data-cy="passengers"
          type="text"
          min="1"
          value={passengers}
          onChange={handleChange(setPassengers)}
        />

        <input data-cy="travelFormSubmit" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default TravelForm;
