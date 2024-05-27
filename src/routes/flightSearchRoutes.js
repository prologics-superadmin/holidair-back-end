const express = require("express");
const FlightSearchController = require("../controllers/FlightSearchController");
const router = express.Router();

router.post("/", FlightSearchController.searchFlights);
router.post("/fare-rule", FlightSearchController.getFareRules);
router.get("/airports/:text", FlightSearchController.airportSearch);

module.exports = router;
