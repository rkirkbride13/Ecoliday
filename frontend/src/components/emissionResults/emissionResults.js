const EmissionResults = ({ emissions, renderEmissions }) => {
  if (renderEmissions === true) {
    const CO2eSteak = 14;
    const CO2eTshirt = 7;
    const CO2eTree = 25;

    const resultsArray = [
      { type: "plane", emissions: emissions.plane },
      { type: "petrol car", emissions: emissions.petrolCar },
      { type: "electric car", emissions: emissions.electricCar },
      { type: "train", emissions: emissions.train },
    ];

    let resultDivs = resultsArray.map((result) => (
      <div className="dropdown dropdown-hover dropdown-right overflow-visible">
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow-2xl shadow-green-700 bg-green-500 rounded-box w-40 font-bold text-xl text-black text-center"
        >
          <li>
            {`${Math.ceil(result.emissions.total / CO2eSteak)} ${
              Math.ceil(result.emissions.total / CO2eSteak) === 1
                ? "Steak"
                : "Steaks"
            }`}
          </li>
          <li>
            {`${Math.ceil(result.emissions.total / CO2eTshirt)} ${
              Math.ceil(result.emissions.total / CO2eTshirt) === 1
                ? "T-shirt"
                : "T-shirts"
            }`}
          </li>
          <li>
            {`${Math.ceil(result.emissions.total / CO2eTree)} ${
              Math.ceil(result.emissions.total / CO2eTree) === 1
                ? "Tree"
                : "Trees"
            }`}
          </li>
        </ul>
        <div className="stat shadow">    
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
        </div>
      </div>
    ));

    return (
      <>
        <div id="emissionResults" className="mt-2">
            <div>{resultDivs}</div>
        </div>
      </>
    );
  }
};

export default EmissionResults;
