const DistanceController = {
  Calculate: async (req, res, next) => {
    const locationData = await Promise.all(
      [req.query.from, req.query.to].map((location) => {
        return fetch(
          `https://geocode.xyz?locate=${location}&json=1auth=${process.env.GEOCODE_KEY}`
        )
          .then((response) => response.json())
          .catch((err) => console.error(err));
      })
    );

    locationData.forEach((data) => {
      if (data.hasOwnProperty("error")) {
        res.status(400).json({ message: data.error.description });
        return;
      }
    });

    req.query.distance = getDistance(
      locationData[0].latt,
      locationData[0].longt,
      locationData[1].latt,
      locationData[1].longt
    );

    next();
  },
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
