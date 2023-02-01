import React, { useState } from "react";

const EmissionResults = ({ emissions, renderEmissions }) => {
  if (renderEmissions === true) {
    return (
      <>
        <div id="emissionResults" className="mt-24">
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
                >{`Per Person: ${emissions.plane.perPassenger.toFixed(
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