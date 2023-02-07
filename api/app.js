const express = require("express");
const app = express();
const cors = require("cors");
// const JWT = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });
// const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const emissionsRouter = require("./routes/emissions");
const usersRouter = require("./routes/users");
const tokensRouter = require("./routes/tokens");
const tripsRouter = require("./routes/trips");

//route setup
app.use("/emissions", emissionsRouter);
app.use("/users", usersRouter);
app.use("/tokens", tokensRouter);
app.use("/trips", tripsRouter);

module.exports = app;
