import React, { useState } from "react";
import PropTypes from "prop-types";
import places from "./randomPlaces";

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

  const handleChange = (setFunction) => {
    return (event) => {
      setFunction(event.target.value);
    };
  };

  const handleRandomPlace = (event) => {
    event.preventDefault();

    const random = () => {
      return Math.floor(Math.random() * places.length);
    };

    setToForm(places[random()]);
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
        <div id="from" className="mb-5 text-xl">
          <label htmlFor="from-input" className="text-white">
            From:{" "}
          </label>
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

        <div id="to" className="mb-5 text-xl">
          <label htmlFor="to-input" className="text-white">
            To:{" "}
          </label>
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

        <div id="passengers" className="mb-5 text-xl">
          <label htmlFor="passengers-input" className="text-white">
            Number of Passengers:{" "}
          </label>
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
      <div className="mt-2">Why not try the UK?</div>
      <form onSubmit={handleRandomPlace}>
        <input
          data-cy="randomPlace"
          type="submit"
          value="Get a suggestion"
          className="btn bg-green-500 border-0 hover:bg-green-700 rounded-full mt-2"
        />
      </form>
    </div>
  );
};

export default TravelForm;
