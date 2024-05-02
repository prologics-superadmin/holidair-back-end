const express = require("express");
const ReviewController = require("../controllers/ReviewController");
const router = express.Router();

router.post("/", ReviewController.create);
router.put("/:id", ReviewController.update);
router.get("/", ReviewController.getAll);
router.get("/:id", ReviewController.get);
router.get("/list", ReviewController.getList);
router.delete("/:id", ReviewController.delete);

module.exports = router;
