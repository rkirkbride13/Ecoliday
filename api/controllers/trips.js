const Trip = require("../models/trips");

const TripsController = {
  Create: (req, res) => {
    const { to, from, user_id, passengers, emissions } = req.body;

    const trip = new Trip({ to, from, user_id, passengers, emissions });

    trip.save(async (err) => {
      if (err) {
        throw err;
      }
      res.status(201).json({ message: "OK" });
    });
  },
};

module.exports = TripsController;
