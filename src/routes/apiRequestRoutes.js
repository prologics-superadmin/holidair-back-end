const express = require("express");
const APIRequestController = require("../controllers/APIRequestController");
const router = express.Router();

router.post("/api-data-list", APIRequestController.getList);
router.get("/get-data/:id", APIRequestController.getById);
module.exports = router;
