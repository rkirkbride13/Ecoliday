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

  const saveButtonView = token !== null;

  const CO2eSteak = 14;
  const CO2eTshirt = 7;
  const CO2eTree = 25;

  let carFactor = Math.ceil(passengers / 5);

  const resultsArray = [
    {
      type: "plane",
      logo: (
        <>
          <span class="material-symbols-outlined">flight_takeoff</span>
        </>
      ),
      total: emissions.plane.total,
      perPassenger: emissions.plane.perPassenger,
    },
    {
      type: "petrol car",
      logo: (
        <>
          <span class="material-symbols-outlined">directions_car</span>
        </>
      ),
      total: emissions.petrolCar.total * carFactor,
      perPassenger: (emissions.petrolCar.total * carFactor) / passengers,
    },
    {
      type: "electric car",
      logo: (
        <>
          <span class="material-symbols-outlined">electric_car</span>
        </>
      ),
      total: emissions.electricCar.total * carFactor,
      perPassenger: (emissions.electricCar.total * carFactor) / passengers,
    },
    {
      type: "train",
      logo: (
        <>
          <span class="material-symbols-outlined">train</span>
        </>
      ),
      total: emissions.train.total,
      perPassenger: emissions.train.perPassenger,
    },
  ];

  const emissionStats = () => {
    return (
      <>
        <div className="bg-white bg-opacity-20 p-4 rounded-lg">
          <div className="bg-white bg-opacity-75 p-7 rounded-lg">
            <span className="text-green-900 font-bold mr-2 mix-blend-darken">
              From:
            </span>

            <span className="text-gray-600 font-medium">{fromDisplay}</span>
            <span className="text-green-900 font-bold mr-2">
              <br></br>
              To:
            </span>
            <span className="text-gray-600 font-medium">{toDisplay}</span>
            <span className="text-green-900 font-bold mr-2">
              <br></br>
              Passengers:
            </span>
            <span className="text-gray-600 font-medium">{passengers}</span>
            <div className="container">
              <div className="w-full flex flex-row flex-no-wrap rounded-lg  sm:shadow-lg mt-1 mb-5">
                <table className="w-full text-sm text-left bg-white bg-opacity-40  text-gray-500 dark:text-gray-400">
                  <thead className="text-green-900 uppercase dark:bg-gray-700 dark:text-gray-400">
                    <tr className="flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none sm:mb-0">
                      <th class="p-5 ">Transport</th>
                      <th class="p-5 ">
                        Total <br />{" "}
                        <span className="normal-case">(kg C02e)</span>
                      </th>
                      <th class="p-5">
                        Passenger <br />{" "}
                        <span className="normal-case">(kg C02e)</span>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="flex-1 sm:flex-none">
                    {resultsArray.map((result) => {
                      return (
                        <>
                          <tr
                            data-cy={`emissions-dropdown-${result.type}`}
                            className="hover"
                          >
                            <td>{result.logo}</td>
                            <td data-cy={`total-emissions-${result.type}`}>
                              {result.total
                                ? `${result.total.toFixed(1)}`
                                : "N/A"}
                            </td>
                            <td data-cy={`person-emissions-${result.type}`}>
                              {result.perPassenger
                                ? `${result.perPassenger.toFixed(1)}`
                                : "N/A"}
                            </td>
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
              {saveButtonView && (
                <div className="relative h-10">
                  <form
                    onSubmit={handleSave}
                    className="absolute inset-y-0 right-0"
                  >
                    <input
                      data-cy="saveButton"
                      type="submit"
                      disabled={saveToggle}
                      value={saveToggle ? "SAVED" : "SAVE"}
                      className="btn bg-green-500 border-0 hover:bg-green-700 rounded-full"
                    />
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  const emissionsContext = (result) => {
    if (result.total) {
      return (
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow-2xl shadow-green-700 bg-opacity-70 bg-green-500 rounded-box w-52 text-base text-white text-left z-50"
        >
          Equivalent to...
          <li>
            &#x1F42E;
            {`  Eating ${Math.ceil(result.total / CO2eSteak)} ${
              Math.ceil(result.total / CO2eSteak) === 1 ? "steak" : "steaks"
            }`}
          </li>
          <li>
            &#x1F455;
            {`  Buying ${Math.ceil(result.total / CO2eTshirt)} ${
              Math.ceil(result.total / CO2eTshirt) === 1
                ? "T-shirt"
                : "T-shirts"
            }`}
          </li>
          <li>
            &#x1F333;
            {`  Saving ${Math.ceil(result.total / CO2eTree)} ${
              Math.ceil(result.total / CO2eTree) === 1 ? "tree" : "trees"
            } a year`}
          </li>
        </ul>
      );
    }
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
      </div>
    </>
  );
};

export default EmissionResults;
