const express = require("express");
const MarkupPriceController = require("../controllers/MarkupPriceController");
const router = express.Router();

router.post("/", MarkupPriceController.create);
router.put("/:id", MarkupPriceController.update);
router.post("/list", MarkupPriceController.getList);

module.exports = router;
