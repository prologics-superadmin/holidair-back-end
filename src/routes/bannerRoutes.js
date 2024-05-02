const express = require("express");
const router = express.Router();
// const auth = require("../../middlewares/jwtMiddleware");
const BannerController = require("../controllers/BannerController");

router.post("/", BannerController.create);
router.put("/:id", BannerController.update);
router.get("/", BannerController.getAll);
router.get("/:id", BannerController.get);
router.get("/list", BannerController.getList);
router.delete("/:id", BannerController.delete);

module.exports = router;
