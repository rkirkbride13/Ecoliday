const apiKey = require("../apiKey");

const EmissionsController = {
  GetPlaneEmissions: (req, res) => {
    let data = "";
    const URL = "https://beta3.api.climatiq.io/estimate";
    fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
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
      .then((response) => response.json())
      .then((responseData) => {
        data = responseData;
        console.log(responseData);
        res.status(200).json({ message: "ok", co2e: data.co2e });
      })
      .catch((error) => {
        console.error(error);
      });
  },
};

module.exports = EmissionsController;
