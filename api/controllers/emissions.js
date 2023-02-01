const CheckQuery = (req, res) => {if (
  req.query.passengers === undefined ||
  req.query.distance === undefined
) {
  res.status(400).send();
  return false;
} else if (isNaN(req.query.passengers) || isNaN(req.query.distance)) {
  res.status(400).send();
  return false;
} return true}

const EmissionsController = {

  GetPlaneEmissions: (req, res) => {
    if (!CheckQuery(req, res)) {
      return
    }
    let data = "";
    const URL = "https://beta3.api.climatiq.io/estimate";

    fetch(URL, {
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
        data = responseData;
        console.log(responseData);
        res.status(200).json({ message: "ok", co2e: data.co2e });
      })
      .catch((error) => {
        // res.status(404);
        console.error(error);
      });
  }
};

module.exports = EmissionsController;
