const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
// const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const emissionsRouter = require("./routes/emissions");

//route setup
app.use("/emissions", emissionsRouter);

module.exports = app;
