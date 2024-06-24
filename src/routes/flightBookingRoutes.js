const express = require("express");
const FlightBookingController = require("../controllers/FlightBookingController");
const router = express.Router();

router.post("/", FlightBookingController.bookFlight);
router.post(
  "/get-prices",
  FlightBookingController.getSelectedFlightPriceSearch
);
router.put(
  "/update-booking-status/:bookingId",
  FlightBookingController.updateBookingStatus
);
router.get(
  "/update-booking-confirmation",
  FlightBookingController.updatePaymentStatus
);

module.exports = router;
