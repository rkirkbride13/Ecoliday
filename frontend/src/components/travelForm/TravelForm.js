import React, { useState } from "react";

const TravelForm = (props) => {
  const [distance, setDistance] = useState("");
  const [passengers, setPassengers] = useState("");

  const handleChange = (setFunction) => {
    return (event) => {
      setFunction(event.target.value);
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch(
      `/emissions/plane?distance=${distance}&passengers=${passengers}`
    );
  };

  return (
    <div id="travelForm" className="mt-40">
      <h1 className="text-3xl mb-10">Plan your journey...</h1>
      <form onSubmit={handleSubmit}>
        <div id="distance" className="mb-5 text-xl mx-auto">
          <label for="distance-input">Distance (km):</label>
          <br />
          <input
            id="distance-input"
            data-cy="distance"
            type="number"
            min="0.0"
            value={distance}
            onChange={handleChange(setDistance)}
            className="pl-1 focus:outline-none focus:border-sky-500 focus:invalid:border-red-600 invalid:border-red-600 border-2 rounded peer"
          />
          <p className="invisible peer-invalid:visible text-xs pl-1 pt-1 text-red-500">
            Must be a positive whole number
          </p>
        </div>

        <div id="passengers" className="mb-5 text-xl">
          <label for="passengers-input">Number of Passengers: </label>
          <br />
          <input
            id="passengers-input"
            data-cy="passengers"
            type="number"
            min="1"
            value={passengers}
            onChange={handleChange(setPassengers)}
            // pattern="\d*"
            className="pl-1 focus:outline-none focus:border-sky-500 focus:invalid:border-red-600 invalid:border-red-600 border-2 rounded peer"
          />
          <p className="invisible peer-invalid:visible text-xs pl-1 pt-1 text-red-500">
            Must be a positive whole number
          </p>
        </div>

        <input
          data-cy="travelFormSubmit"
          type="submit"
          value="Submit"
          className="btn bg-green-600 border-0 hover:bg-green-700 rounded-full"
        />
      </form>
    </div>
  );
};

export default TravelForm;
