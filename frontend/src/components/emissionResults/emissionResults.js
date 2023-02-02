const EmissionResults = ({ emissions, renderEmissions }) => {
  
  if (renderEmissions === true) {
  const resultsArray = [
    { type: "plane", emissions: emissions.plane },
    { type: "petrol car", emissions: emissions.petrolCar },
    { type: "electric car", emissions: emissions.electricCar },
    { type: "train", emissions: emissions.train },
  ];

  let resultDivs = resultsArray.map((result) => (
    <div className="stat">
      <div className="stat-title">CO2e by {result.type}</div>
      <div
        data-cy={`total-emissions-${result.type}`}
        className="stat-value"
      >{`${result.emissions.total.toFixed(1)} kg`}</div>
      <div
        data-cy={`person-emissions-${result.type}`}
        className="stat-desc"
      >{`Per Person: ${result.emissions.perPassenger.toFixed(1)} kg`}</div>
    </div>
  ));

    return (
      <>
        <div id="emissionResults" className="mt-2">
          <div>
            <div className="stats stats-vertical shadow">{resultDivs}</div>
          </div>
        </div>
      </>
    );
  }
};

export default EmissionResults;
