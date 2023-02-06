const express = require("express");
const router = express.Router();

const TripsController = require("../controllers/trips");

router.post("/", TripsController.Create);

module.exports = router;
