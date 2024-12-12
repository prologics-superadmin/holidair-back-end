const express = require("express");
const DestinationRetriveController = require("../controllers/DestinationRetriveController");
const router = express.Router();

router.get(
  "/hotel-destinations",
  DestinationRetriveController.hotelDestinations
);
router.get(
  "/activity-destinations",
  DestinationRetriveController.activityDestination
);
router.get("/airports", DestinationRetriveController.fetchAndSaveAirports);

module.exports = router;
