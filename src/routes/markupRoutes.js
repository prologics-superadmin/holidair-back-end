const express = require("express");
const MarkupController = require("../controllers/MarkupController");
const router = express.Router();

router.post("/", MarkupController.createMarkup);
router.post("/:id", MarkupController.updateMarkup);

module.exports = router;
