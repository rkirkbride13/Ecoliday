const mongoose = require("mongoose");

const TempSchema = new mongoose.Schema({
  message: String,
});

const Temp = mongoose.model("Temp", TempSchema);

module.exports = Temp;
