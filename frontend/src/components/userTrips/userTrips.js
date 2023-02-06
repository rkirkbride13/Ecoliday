import React, { useEffect, useState } from "react";

const UserTrips = () => {
  const [trips, setTrips] = useState([]);
  // uncomment when tokens added const user_id = window.localStorage.getItem("user_id");
  

  const unpackEmissions = (trip) => {
    return [
      { type: "plane", emissions: trip.emissions.plane },
      { type: "petrol car", emissions: trip.emissions.petrolCar },
      { type: "electric car", emissions: trip.emissions.electricCar },
      { type: "train", emissions: trip.emissions.train },
    ]
  }

  useEffect(() => {
    fetch("/trips", {
      headers: {
        // update user_id below to take the user id from local storage when tokens implemented
        user_id: `63e0ddcb06e90257776466a2`,
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        setTrips(data.trips);
      });
  }, []);

  return (
    <>
      <div data-cy="trips">
        {trips.map((trip) => (
          <div data-cy="trip">
            {`${trip.from} to ${trip.to} with ${trip.passengers} passengers`}
            {unpackEmissions(trip).map(emissions => (
              <div className="stats border">
              <div className="stat w-60">
                <div className="stat-title">CO2e by {emissions.type}</div>
                <div
                  data-cy={`total-emissions-${emissions.type}`}
                  className="stat-value"
                >{`${emissions.emissions.total.toFixed(1)} kg`}</div>
                <div
                  data-cy={`person-emissions-${emissions.type}`}
                  className="stat-desc"
                >{`Per Person: ${emissions.emissions.perPassenger.toFixed(
                  1
                )} kg`}</div>
              </div>
            </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default UserTrips;
