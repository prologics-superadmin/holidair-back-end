const express = require("express");
const MarkupController = require("../controllers/MarkupController");
const router = express.Router();

router.post("/", MarkupController.createMarkup);
router.post("/:id", MarkupController.updateMarkup);
router.get("/:id", MarkupController.getSelectedMarkup);
// router.post("/list", MarkupController.list);

module.exports = router;
