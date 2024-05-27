const express = require("express");
const HotelSearchController = require("../controllers/HotelSearchController");

const router = express.Router();

router.post("/", HotelSearchController.searchHotels);

module.exports = router;
