const express = require("express");
const router = express.Router();

const EmissionsController = require("../controllers/emissions");

router.get("/", (req, res) => {
  EmissionsController.GetEmissions(req, res);
});

module.exports = router;
