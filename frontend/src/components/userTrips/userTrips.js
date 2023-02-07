import React, { useEffect, useState } from "react";
import NavBar from "../navBar/navBar";

const UserTrips = () => {
  const [trips, setTrips] = useState([]);
  // uncomment when tokens added const user_id = window.localStorage.getItem("user_id");

  const unpackEmissionsTwo = (trip) => {
    return [
      {
        type: "Total",
        plane: trip.emissions.plane.total,
        petrolCar: trip.emissions.petrolCar.total,
        electricCar: trip.emissions.electricCar.total,
        train: trip.emissions.train.total,
      },
      {
        type: "Per Passenger",
        plane: trip.emissions.plane.perPassenger,
        petrolCar: trip.emissions.petrolCar.perPassenger,
        electricCar: trip.emissions.electricCar.perPassenger,
        train: trip.emissions.train.perPassenger,
      },
    ];
  };

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
      <main id="main-container">
        <nav className="sticky z-50">
          <NavBar />
        </nav>
        <div className="h-28"></div>
        <div
          data-cy="trips"
          className="h-56 grid grid-cols-1 gap-8 content-start w-1/2 mx-auto z-30"
        >
          {trips
            .map((trip) => (
              <div data-cy="trip" className="">
                {`${trip.from} to ${trip.to} with ${trip.passengers} passengers`}
                <div className="mb-4">
                  <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                      <thead>
                        <tr>
                          <th>CO2e(kg)</th>
                          <th>Plane</th>
                          <th>Petrol Car</th>
                          <th>Electric Car</th>
                          <th>Rail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {unpackEmissionsTwo(trip).map((emissions) => (
                          <tr>
                            <td>{emissions.type}</td>
                            <td>{`${emissions.plane.toFixed(1)}`}</td>
                            <td>{`${emissions.petrolCar.toFixed(1)}`}</td>
                            <td>{`${emissions.electricCar.toFixed(1)}`}</td>
                            <td>{`${emissions.train.toFixed(1)}`}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))
            .reverse()}
        </div>
      </main>
    </>
  );
};

export default UserTrips;
