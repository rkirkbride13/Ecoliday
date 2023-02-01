import React, { useState } from "react";

const EmissionResults = ({emissions, renderEmissions, passengers}) => {

  if(renderEmissions === true) {
    return (
      <>
      <h1>Results</h1>
      <div data-cy="total-emissions">{`CO2e: ${emissions.toFixed(1)} kg`}</div>
      </>
    );
  };
}

export default EmissionResults;