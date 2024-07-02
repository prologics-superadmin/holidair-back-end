const express = require("express");
const BookingController = require("../controllers/BookingController");
const router = express.Router();

router.post("/get-flight-bookings", BookingController.getFlightBookings);
router.get("/get-hotel-bookings", BookingController.getHotelBookings);

module.exports = router;
