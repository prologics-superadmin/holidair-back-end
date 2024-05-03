const express = require("express");
const router = express.Router();
// const auth = require("../../middlewares/jwtMiddleware");
const BannerController = require("../controllers/BannerController");

router.post("/", BannerController.create);
router.put("/:id", BannerController.update);
router.get("/get-list", BannerController.getBannerList);
router.get("/", BannerController.getAll);
router.get("/:id", BannerController.get);
router.post("/list", BannerController.getList);
router.delete("/:id", BannerController.delete);
router.post("/image-upload", BannerController.imageUpload);

module.exports = router;
