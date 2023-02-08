import PropTypes from "prop-types";

const Trip = ({ trip, token, setTrips }) => {
  Trip.propTypes = {
    trip: PropTypes.object,
    token: PropTypes.string,
    setTrips: PropTypes.func,
  };

  const unpackEmissions = (trip) => {
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

  const handleDelete = async (e) => {
    e.preventDefault();
    const response = await fetch("/trips", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        trip_id: trip._id,
      },
    });

    await response.json();

    if (response.status !== 200) {
      console.log("trip NOT deleted");
    } else {
      console.log("trip deleted");

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
      }
    }
  };

  return (
    <>
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
                {unpackEmissions(trip).map((emissions) => (
                  <tr>
                    <td>{emissions.type}</td>
                    <td>
                      {emissions.plane
                        ? `${emissions.plane.toFixed(1)}`
                        : "N/A"}
                    </td>
                    <td>
                      {emissions.petrolCar
                        ? `${emissions.petrolCar.toFixed(1)}`
                        : "N/A"}
                    </td>
                    <td>
                      {emissions.electricCar
                        ? `${emissions.electricCar.toFixed(1)}`
                        : "N/A"}
                    </td>
                    <td>
                      {emissions.train
                        ? `${emissions.train.toFixed(1)}`
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <form onSubmit={handleDelete}>
            <input
              data-cy="deleteButton"
              type="submit"
              value="Delete"
              className="btn bg-green-500 border-0 hover:bg-green-700 rounded-full"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Trip;
