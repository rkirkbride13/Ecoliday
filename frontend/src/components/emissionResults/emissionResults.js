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
        <h1 data-cy="header-emissions">Emissions for {distance} km</h1>
        <div data-cy="total-emissions">{`CO2e (Total): ${emissions.toFixed(
          1
        )} kg`}</div>
        <div data-cy="person-emissions">{`CO2e (Per Person): ${(
          emissions / passengers
        ).toFixed(1)} kg`}</div>
      </>
    );
  }
};

export default EmissionResults;
