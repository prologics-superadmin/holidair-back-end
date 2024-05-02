const express = require("express");
const DestinationController = require("../controllers/DestinationController");
const router = express.Router();
// const auth = require("../../middlewares/jwtMiddleware");

router.post("/", DestinationController.create);
router.put("/:id", DestinationController.update);
router.get("/", DestinationController.getAll);
router.get("/:id", DestinationController.get);
router.get("/list", DestinationController.getList);
router.delete("/:id", DestinationController.delete);

module.exports = router;
