const express = require("express");
const BookingRequestController = require("../controllers/BookingRequestController");
const router = express.Router();

router.post("/", BookingRequestController.create);
router.post("/get-booking-requests", BookingRequestController.getList);

module.exports = router;
