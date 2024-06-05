const express = require("express");
const AttreactionBookingController = require("../controllers/AttreactionBookingController");
const router = express.Router();

router.post("/", AttreactionBookingController.bookAttraction);

module.exports = router;
