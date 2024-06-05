const express = require("express");
const HotelBookingController = require("../controllers/HotelBookingController");
const router = express.Router();

router.post("/", HotelBookingController.bookHotel);

module.exports = router;
