import React, { useState } from "react";

const EmissionResults = ({
  distance,
  emissions,
  renderEmissions,
}) => {
  if (renderEmissions === true) {
    return (
      <>
        <div
          id="emissionResults"
          className="mt-24"
        >
          {/* <h1
            data-cy="header-emissions"
            className="text-1xl mb-10 text-center text-green-600 "
          >
            Emissions for {distance} km
          </h1> */}
          <div>
            <div className="stat shadow">
              <div className="stat">
                <div className="stat-title">CO2e Air</div>
                <div
                  data-cy="total-emissions"
                  className="stat-value"
                >{`${emissions.plane.total.toFixed(1)} kg`}</div>
                <div
                  data-cy="person-emissions"
                  className="stat-desc"
                >{`Per Person: ${(emissions.plane.perPassenger).toFixed(
                  1
                )} kg`}</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default EmissionResults;
