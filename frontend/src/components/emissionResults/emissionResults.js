import React, { useState } from "react";

const EmissionResults = ({emissions, renderEmissions}) => {

  if(renderEmissions === true) {
    return (
      <>
      <h1>Results</h1>
      <div>{emissions}</div>
      </>
    );
  };
}

export default EmissionResults;