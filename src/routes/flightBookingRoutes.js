const express = require("express");
const FlightBookingController = require("../controllers/FlightBookingController");
const router = express.Router();

router.post("/", FlightBookingController.bookFlight);

module.exports = router;
