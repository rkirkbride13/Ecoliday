const mongoose = require("mongoose");

const TripsSchema = new mongoose.Schema(
  {
    to: { type: String, required: true },
    from: { type: String, required: true },
    user_id: { type: String, required: true },
    passengers: { type: String, required: true },
    emissions: { type: Object, required: true },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trips", TripsSchema);

module.exports = Trip;
