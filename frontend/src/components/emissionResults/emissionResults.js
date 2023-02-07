import React, { useState } from "react";

const EmissionResults = ({
  emissions,
  renderEmissions,
  fromDisplay,
  toDisplay,
  passengers,
  setSaveToggle,
  saveToggle,
}) => {
  const [token] = useState(window.localStorage.getItem("token"));
  if (renderEmissions === false) return <></>;

  const CO2eSteak = 14;
  const CO2eTshirt = 7;
  const CO2eTree = 25;

  const resultsArray = [
    { type: "plane", emissions: emissions.plane },
    { type: "petrol car", emissions: emissions.petrolCar },
    { type: "electric car", emissions: emissions.electricCar },
    { type: "train", emissions: emissions.train },
  ];

  const emissionStats = (result) => {
    if (Object.values(result.emissions).some((value) => value === null)) {
      return (
        <div className="stats border">
          <div className="stat w-60">
            <div className="stat-title">CO2e by {result.type}</div>
            <div
              data-cy={`total-emissions-${result.type}`}
              className="stat-value text-2xl"
            >
              Route not found
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <>
          {emissionsContext(result)}
          <div className="stats border">
            <div className="stat w-60">
              <div className="stat-title">CO2e by {result.type}</div>
              <div
                data-cy={`total-emissions-${result.type}`}
                className="stat-value"
              >{`${result.emissions.total.toFixed(1)} kg`}</div>
              <div
                data-cy={`person-emissions-${result.type}`}
                className="stat-desc"
              >{`Per Person: ${result.emissions.perPassenger.toFixed(
                1
              )} kg`}</div>
            </div>
          </div>
        </>
      );
    }
  };

  const emissionsContext = (result) => {
    return (
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow-2xl shadow-green-700 bg-green-500 rounded-box w-60 text-base font-bold text-white text-left ml-2"
      >
        Equivalent to...
        <li>
          &#x1F42E;
          {`  Eating ${Math.ceil(result.emissions.total / CO2eSteak)} ${
            Math.ceil(result.emissions.total / CO2eSteak) === 1
              ? "steak"
              : "steaks"
          }`}
        </li>
        <li>
          &#x1F455;
          {`  Buying ${Math.ceil(result.emissions.total / CO2eTshirt)} ${
            Math.ceil(result.emissions.total / CO2eTshirt) === 1
              ? "T-shirt"
              : "T-shirts"
          }`}
        </li>
        <li>
          &#x1F333;
          {`  Saving ${Math.ceil(result.emissions.total / CO2eTree)} ${
            Math.ceil(result.emissions.total / CO2eTree) === 1
              ? "tree"
              : "trees"
          } this year`}
        </li>
      </ul>
    );
  };

  let resultDivs = resultsArray.map((result) => (
    <div>
      <div
        data-cy={`emissions-dropdown-${result.type}`}
        className="dropdown dropdown-hover dropdown-right mb-2"
      >
        {emissionStats(result)}
      </div>
    </div>
  ));

  const handleSave = async (e) => {
    e.preventDefault();

    let response = await fetch("/trips", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        to: toDisplay,
        from: fromDisplay,
        passengers: passengers,
        emissions: emissions,
      }),
    });

    if (response.status !== 201) {
      console.log("trip NOT added");
    } else {
      setSaveToggle(true);
      console.log("trip added");
    }
  };

  return (
    <>
      <div id="emissionResults">
        <div>{resultDivs}</div>
        <form onSubmit={handleSave}>
          <input
            data-cy="saveButton"
            type="submit"
            disabled={saveToggle}
            value={saveToggle ? "SAVED" : "SAVE"}
            className="btn bg-green-500 border-0 hover:bg-green-700 rounded-full"
          />
        </form>
      </div>
    </>
  );
};

export default EmissionResults;
