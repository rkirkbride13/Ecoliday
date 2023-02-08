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
    {
      type: "plane",
      logo: (
        <>
          <span class="material-symbols-outlined">flight_takeoff</span>
        </>
      ),
      emissions: emissions.plane,
    },
    {
      type: "petrolCar",
      logo: (
        <>
          <span class="material-symbols-outlined">directions_car</span>
        </>
      ),
      emissions: emissions.petrolCar,
    },
    {
      type: "electricCar",
      logo: (
        <>
          <span class="material-symbols-outlined">electric_car</span>
        </>
      ),
      emissions: emissions.electricCar,
    },
    {
      type: "train",
      logo: (
        <>
          <span class="material-symbols-outlined">train</span>
        </>
      ),
      emissions: emissions.train,
    },
  ];

  const emissionStats = () => {
    return (
      <>
        <div>
          <table className="table h-max">
            <thead>
              <tr>
                <th>Transport</th>
                <th>
                  Total <br /> <span className="normal-case">(kg C02e)</span>
                </th>
                <th>
                  Passenger <br />{" "}
                  <span className="normal-case">(kg C02e)</span>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {resultsArray.map((result) => {
                return (
                  <>
                    <tr
                      data-cy={`emissions-dropdown-${result.type}`}
                      className="hover"
                    >
                      <td>{result.logo}</td>
                      <td>{`${result.emissions.total.toFixed(1)}`}</td>
                      <td>{`${result.emissions.perPassenger.toFixed(1)}`}</td>
                      <td className="dropdown dropdown-hover dropdown-right h-full">
                        <span className="material-symbols-outlined text-center">
                          help
                        </span>
                        {emissionsContext(result)}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  const emissionsContext = (result) => {
    return (
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow-2xl shadow-green-700 bg-green-500 rounded-box w-60 text-base font-bold text-white text-left z-50"
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
      <div id="emissionResults" className="mt-20">
        <div>{emissionStats()}</div>
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
