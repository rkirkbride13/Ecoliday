const DistanceController = {
  Calculate: async (req, res, next) => {
    await fetch(
      `https://geocode.xyz?locate=${req.query.from}&json=1auth=${process.env.GEOCODE_KEY}`
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));
    await fetch(
      `https://geocode.xyz?locate=${req.query.to}&json=1auth=${process.env.GEOCODE_KEY}`
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));
  },
};

module.exports = DistanceController;
