const DistanceController = {
  Calculate: async (req, res, next) => {
    locationData = await Promise.all(
      [req.query.from, req.query.to].map((location) => {
        fetch(
          `https://geocode.xyz?locate=${location}&json=1auth=${process.env.GEOCODE_KEY}`
        )
          .then((response) => response.json())
          .catch((err) => console.error(err));
      })
    );
  },
};

module.exports = DistanceController;
