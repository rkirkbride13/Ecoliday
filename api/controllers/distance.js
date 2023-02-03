const DistanceController = {
  Calculate: async (req, res, next) => {
    if (!req.query.from || !req.query.to) {
      res.status(400).send();
      return;
    }

    const locationData = await Promise.all(
      [req.query.from, req.query.to].map((location) => {
        return fetch(
          `https://api.geoapify.com/v1/geocode/search?text=${location}&format=json&apiKey=${process.env.GEOAPIFY_KEY}`
        )
          .then((response) => response.json())
          .catch((err) => console.error(err));
      })
    );

    const error = checkError(locationData);
    if (error) return res.status(404).json({ message: error });

    updateRequest(req, locationData);

    next();
  },
};

const updateRequest = (req, locationData) => {
  req.query.distance = getDistance(
    locationData[0].results[0].lat,
    locationData[0].results[0].lon,
    locationData[1].results[0].lat,
    locationData[1].results[0].lon
  );

  // req.locals.from = {
  //   prov: locationData[0].standard.prov,
  //   city: locationData[0].standard.city,
  // };

  // req.locals.to = {
  //   prov: locationData[1].standard.prov,
  //   city: locationData[1].standard.city,
  // };
};

const checkError = (locationData) => {
  let errorMessage = "";
  locationData.forEach((data) => {
    if (data.results.length === 0) {
      errorMessage = "Request returned no queries";
      return;
    }
  });
  return errorMessage;
};

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

module.exports = DistanceController;
