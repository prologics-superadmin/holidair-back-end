const express = require("express");
const FlightOfferController = require("../controllers/FlightOfferController");
const router = express.Router();

router.post("/", FlightOfferController.create);
router.put("/:id", FlightOfferController.update);
router.get("/get-list/:type", FlightOfferController.getAllList);
router.get("/", FlightOfferController.getAll);
router.get("/:id", FlightOfferController.get);
router.post("/list", FlightOfferController.getList);
router.delete("/:id", FlightOfferController.delete);

module.exports = router;
