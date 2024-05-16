const express = require("express");
const FlightSearchController = require("../controllers/FlightSearchController");
const router = express.Router();

router.post("/", FlightSearchController.searchFlights);

module.exports = router;
