import PropTypes from "prop-types";

const Trip = ({ trip, token, setTrips }) => {
  Trip.propTypes = {
    trip: PropTypes.object,
    token: PropTypes.string,
    setTrips: PropTypes.func,
  };

  const unpackEmissions = (trip, type) => {
    if (type === "Total") {
      return [
        { result: trip.emissions.plane.total },
        { result: trip.emissions.petrolCar.total },
        { result: trip.emissions.electricCar.total },
        { result: trip.emissions.train.total },
      ];
    } else {
      return [
        { result: trip.emissions.plane.perPassenger },
        { result: trip.emissions.petrolCar.perPassenger },
        { result: trip.emissions.electricCar.perPassenger },
        { result: trip.emissions.train.perPassenger },
      ];
    }
  };

  const formatEmissions = (trip, type) => {
    return (
      <>
        <tr>
          <td>{type}</td>
          {unpackEmissions(trip, type).map((emissions) => (
            <td>
              {emissions.result ? `${emissions.result.toFixed(1)}` : "N/A"}
            </td>
          ))}
        </tr>
      </>
    );
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
                {formatEmissions(trip, "Total")}
                {formatEmissions(trip, "Per Person")}
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
