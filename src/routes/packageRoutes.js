const express = require("express");
const PackageController = require("../controllers/PackageController");
const router = express.Router();

router.post("/", PackageController.create);
router.put("/:id", PackageController.update);
router.get("/package-details", PackageController.getPackageDetails);
router.get("/", PackageController.getAll);
router.get("/:id", PackageController.get);
router.post("/list", PackageController.getList);
router.delete("/:id", PackageController.delete);
router.post("/image-upload", PackageController.imageUpload);

module.exports = router;
