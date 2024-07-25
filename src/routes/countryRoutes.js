const express = require("express");
const CountryController = require("../controllers/CountryController");
const router = express.Router();

router.get("/store-countries", CountryController.createCountryList);
router.get("/store-cities", CountryController.createCityList);
router.post("/list", CountryController.getList);
router.post("/city-list", CountryController.getCityList);
router.post("/airline-list", CountryController.getAirlineList);
router.post("/airport-list", CountryController.getAirportsList);
router.get("/airports/:text", CountryController.getAirports);
router.get("/airlines/:text", CountryController.getAirLines);
router.get("/country/:text", CountryController.getCountry);
router.get("/location/:text", CountryController.getLocation);

module.exports = router;
