import React, { useEffect, useState } from "react";
import NavBar from "../navBar/navBar";

const UserTrips = ({ navigate }) => {
  const [trips, setTrips] = useState([]);
  const [token] = useState(window.localStorage.getItem("token"));
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
    if (token) {
      fetch("/trips", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          setTrips(data.trips);
        });
    } else {
      navigate("/");
    }
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
  };

  return (
    <>
      <main id="main-container">
        <nav className="sticky z-50">
          <NavBar logout={logout} />
        </nav>
        <div className="h-28"></div>
        <div
          data-cy="trips"
          className="h-56 grid grid-cols-1 gap-8 content-start w-1/2 mx-auto z-30"
        >
          {trips
            .map((trip) => (
              <div data-cy="trip">
                <span className="text-green-500 font-bold mr-2">From:</span>

                <span className="text-gray-600 font-medium">{trip.from}</span>
                <span className="text-green-500 font-bold mr-2">
                  <br></br>
                  To:
                </span>
                <span className="text-gray-600 font-medium">{trip.to}</span>
                <span className="text-green-500 font-bold mr-2">
                  <br></br>
                  Passengers:
                </span>
                <span className="text-gray-600 font-medium mb-2">
                  {trip.passengers}
                </span>
                <div className="mb-2"></div>

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
