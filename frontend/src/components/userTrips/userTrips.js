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
        <div>
          <div
            data-cy="trips"
            className="h-56 grid grid-cols-1 gap-8 content-start w-1/2 mx-auto z-30"
          >
            {trips
              .map((trip) => (
                <div
                  data-cy="trip"
                  className="bg-white bg-opacity-60 p-3 rounded-lg"
                >
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

                  <div className="container">
                    <div className="w-full flex flex-row flex-no-wrap rounded-lg overflow-hidden sm:shadow-lg my-5">
                      <table className="w-full text-sm text-left   text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                          <tr className="flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                            <th scope="col" class="p-5 text-left">
                              CO2e(kg)
                            </th>
                            <th class="p-3 text-left">Plane</th>
                            <th class="p-3 text-left">Petrol Car</th>
                            <th class="p-3 text-left">Electric Car</th>
                            <th class="p-3 text-left">Rail</th>
                          </tr>
                        </thead>
                        <tbody className="flex-1 sm:flex-none">
                          {unpackEmissionsTwo(trip).map((emissions) => (
                            <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                              <td class="hover:bg-gray-100 p-3">
                                {emissions.type}
                              </td>
                              <td class="hover:bg-gray-100 p-3">{`${emissions.plane.toFixed(
                                1
                              )}`}</td>
                              <td class="hover:bg-gray-100 p-3">{`${emissions.petrolCar.toFixed(
                                1
                              )}`}</td>
                              <td class="hover:bg-gray-100 p-3">{`${emissions.electricCar.toFixed(
                                1
                              )}`}</td>
                              <td class="hover:bg-gray-100 p-3">{`${emissions.train.toFixed(
                                1
                              )}`}</td>
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
        </div>
      </main>
    </>
  );
};

export default UserTrips;
