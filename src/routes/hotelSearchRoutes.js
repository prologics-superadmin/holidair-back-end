const express = require("express");
const HotelSearchController = require("../controllers/HotelSearchController");

const router = express.Router();

router.post("/", HotelSearchController.searchHotels);
router.get("/get-hotel-content/:id", HotelSearchController.getHotelContent);

module.exports = router;
