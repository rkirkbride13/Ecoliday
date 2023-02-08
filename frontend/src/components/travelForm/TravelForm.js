import React, { useState } from "react";
import PropTypes from "prop-types";

const TravelForm = ({
  setEmissions,
  setRenderEmissions,
  setToDisplay,
  setFromDisplay,
  passengers,
  setPassengers,
  setSaveToggle,
}) => {
  TravelForm.propTypes = {
    setEmissions: PropTypes.func,
    setRenderEmissions: PropTypes.func,
    setToDisplay: PropTypes.func,
    setFromDisplay: PropTypes.func,
    passengers: PropTypes.string,
    setPassengers: PropTypes.func,
    setSaveToggle: PropTypes.func,
  };

  const [toForm, setToForm] = useState("");
  const [fromForm, setFromForm] = useState("");
  // const [passengers, setPassengers] = useState("");

  const handleChange = (setFunction) => {
    return (event) => {
      setFunction(event.target.value);
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(
      `/emissions?from=${fromForm}&to=${toForm}&passengers=${passengers}`
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setEmissions(responseData.emissions);
        setRenderEmissions(true);
        setToDisplay(responseData.to);
        setFromDisplay(responseData.from);
        setSaveToggle(false);
      });
  };

  return (
    <div id="travelForm" className="mt-8">
      <h1 className="text-3xl mb-10 font-medium text-white">
        Plan your journey
      </h1>
      <form onSubmit={handleSubmit}>
        <div id="from" className="mb-5 text-xl text-white">
          <label htmlFor="from-input">From: </label>
          <br />
          <input
            id="from-input"
            data-cy="from"
            type="text"
            required
            value={fromForm}
            onChange={handleChange(setFromForm)}
            // pattern="\d*"
            className="pl-1 focus:outline-none focus:border-sky-500 focus:invalid:border-red-600 border-2 rounded peer"
          />
          <p className="invisible peer-focus:peer-invalid:visible text-xs pl-1 pt-1 text-white">
            Enter details
          </p>
        </div>

        <div id="to" className="mb-5 text-xl text-white">
          <label htmlFor="to-input">To: </label>
          <br />
          <input
            id="to-input"
            data-cy="to"
            type="text"
            required
            value={toForm}
            onChange={handleChange(setToForm)}
            // pattern="\d*"
            className="pl-1 focus:outline-none focus:border-sky-500 focus:invalid:border-red-600 border-2 rounded peer"
          />
          <p className="invisible peer-focus:peer-invalid:visible text-xs pl-1 pt-1 text-white">
            Enter details
          </p>
        </div>

        <div id="passengers" className="mb-5 text-xl text-white">
          <label htmlFor="passengers-input">Number of Passengers: </label>
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
          <p className="invisible peer-invalid:visible text-xs pl-1 pt-1 text-white">
            Must be a positive whole number
          </p>
        </div>

        <input
          data-cy="travelFormSubmit"
          type="submit"
          value="Submit"
          className="btn bg-transparent hover:bg-transparent hover:border-white border-white rounded-full"
        />
      </form>
    </div>
  );
};

export default TravelForm;
