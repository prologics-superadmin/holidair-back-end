const express = require("express");
const ReviewController = require("../controllers/ReviewController");
const router = express.Router();

router.post("/", ReviewController.create);
router.put("/:id", ReviewController.update);
router.get("/", ReviewController.getAll);
router.get("/:id", ReviewController.get);
router.post("/list", ReviewController.getList);
router.delete("/:id", ReviewController.delete);
router.post("/image-upload", ReviewController.imageUpload);

module.exports = router;
