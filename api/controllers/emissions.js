const EmissionsController = {
  GetEmissions: async (req, res) => {
    if (!CheckQuery(req, res)) {
      return;
    }

    const URL = "https://beta3.api.climatiq.io/estimate";

    const planeEmissions = await GetPlaneEmissions(req, res, URL);
    const trainEmissions = await GetTrainEmissions(req, res, URL);
    const petrolCarEmissions = await GetPetrolCarEmissions(req, res, URL);
    const electricCarEmissions = await GetElectricCarEmissions(req, res, URL);

    res.status(200).json({message: 'OK', emissions: {
      plane: planeEmissions,
      train: trainEmissions,
      petrolCar: petrolCarEmissions,
      electricCar: electricCarEmissions,
    }})
  },
};

const CheckQuery = (req, res) => {
  if (req.query.passengers === undefined || req.query.distance === undefined) {
    res.status(400).send();
    return false;
  } else if (isNaN(req.query.passengers) || isNaN(req.query.distance)) {
    res.status(400).send();
    return false;
  }
  return true;
};

const GetElectricCarEmissions = (req, res, URL) => {
  return fetch(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CLIMATIQ_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({
      emission_factor: {
        activity_id:
          "passenger_vehicle-vehicle_type_car-fuel_source_bev-engine_size_na-vehicle_age_na-vehicle_weight_na",
        source: "BEIS",
        region: "GB",
        year: "2022",
        lca_activity: "electricity_generation",
      },
      parameters: {
        passengers: parseInt(req.query.passengers),
        distance: parseInt(req.query.distance),
        distance_unit: "km",
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      return responseData.co2e
    })
    .catch((error) => {
      // res.status(404);
      console.error(error);
    });
};

const GetPetrolCarEmissions = (req, res, URL) => {
  return fetch(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CLIMATIQ_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({
      emission_factor: {
        activity_id:
          "passenger_vehicle-vehicle_type_car-fuel_source_petrol-engine_size_na-vehicle_age_na-vehicle_weight_na",
        source: "BEIS",
        region: "GB",
        year: "2022",
        lca_activity: "fuel_combustion",
      },
      parameters: {
        passengers: parseInt(req.query.passengers),
        distance: parseInt(req.query.distance),
        distance_unit: "km",
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      return responseData.co2e;
    })
    .catch((error) => {
      // res.status(404);
      console.error(error);
    });
};

const GetTrainEmissions = (req, res, URL) => {
  return fetch(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CLIMATIQ_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({
      emission_factor: {
        activity_id:
          "passenger_train-route_type_international_rail-fuel_source_na",
        source: "BEIS",
        region: "GB",
        year: "2022",
        lca_activity: "fuel_combustion",
      },
      parameters: {
        passengers: parseInt(req.query.passengers),
        distance: parseInt(req.query.distance),
        distance_unit: "km",
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      return responseData.co2e;
    })
    .catch((error) => {
      // res.status(404);
      console.error(error);
    });
};

const GetPlaneEmissions = (req, res, URL) => {
  return fetch(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CLIMATIQ_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({
      emission_factor: {
        activity_id:
          "passenger_flight-route_type_international-aircraft_type_na-distance_short_haul_lt_3700km-class_na-rf_included",
        source: "GHG Protocol",
        region: "GB",
        year: "2021",
        lca_activity: "fuel_combustion",
      },
      parameters: {
        passengers: parseInt(req.query.passengers),
        distance: parseInt(req.query.distance),
        distance_unit: "km",
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      return responseData.co2e;
    })
    .catch((error) => {
      // res.status(404);
      console.error(error);
    });
};

module.exports = EmissionsController;
