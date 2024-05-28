const express = require("express");
const AttractionSearchController = require("../controllers/AttractionSearchController");
const router = express.Router();

router.post("/", AttractionSearchController.searchAttractions);
router.post(
  "/selected-data",
  AttractionSearchController.getSelectedAttractionDetails
);

module.exports = router;
