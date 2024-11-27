const express = require("express");
const BookingRequestController = require("../controllers/BookingRequestController");
const router = express.Router();

router.post("/", BookingRequestController.create);
router.post("/get-booking-requests", BookingRequestController.getList);
router.post("/contact-us-requests", BookingRequestController.contactUs);
router.post("/call-me-requests", BookingRequestController.callMeRequest);
router.post("/call-me-list", BookingRequestController.callMeList);
router.post("/markup-list", BookingRequestController.markupList);

module.exports = router;
