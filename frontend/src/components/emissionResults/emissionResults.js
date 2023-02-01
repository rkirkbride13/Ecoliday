import React, { useState } from "react";

const EmissionResults = ({
  distance,
  emissions,
  renderEmissions,
  passengers,
}) => {
  if (renderEmissions === true) {
    return (
      <>
        <div
          id="emissionResults"
          className="card w-96 bg-base-100 shadow-xl mt-10 bg-gray-100"
        >
          <h1
            data-cy="header-emissions"
            className="text-3xl mb-10 mt-5 text-center"
          >
            Emissions for {distance} km
          </h1>
          <div>
            <div className="badge badge-outline badge-lg">AIR</div>
            <div>
              <div
                data-cy="total-emissions"
                className="mb-5 text-xl mx-auto badge badge-lg"
              >{`CO2e (Total): ${emissions.toFixed(1)} kg`}</div>
              <div
                data-cy="person-emissions"
                className="mb-5 text-xl mx-auto badge badge-lg"
              >{`CO2e (Per Person): ${(emissions / passengers).toFixed(
                1
              )} kg`}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default EmissionResults;
