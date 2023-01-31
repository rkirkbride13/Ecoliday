const express = require("express");
const router = express.Router();

const EmissionsController = require("../controllers/emissions");

router.get("/plane", EmissionsController.GetPlaneEmissions);

module.exports = router;
