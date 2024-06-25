const express = require("express");
const UserProfileController = require("../../controllers/UserManagement/UserProfileController");
const router = express.Router();
const auth = require("../../middlewares/jwtMiddleware");

router.get(
  "/get-booking-details",
  auth,
  UserProfileController.getBookingDetails
);

module.exports = router;
