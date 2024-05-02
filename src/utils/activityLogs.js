const ActiveLog = require("../models/commen/ActiveLog");
const ActiveLogService = require("../services/commen/ActiveLogService");
const { generateUUID } = require("../utils/generateUUID");

async function createActiveLog(req, res) {
  try {
    let id = await generateUUID(ActiveLog, "", 234, 1);

    let transaction_body = {
      user: req.body.user,
      function_name: req.body.function_name,
      UUID: req.body.UUID,
      device: req.body.device,
      ip_address: req.body.ip_address,
      location: req.body.location,
      os: req.body.os,
      doc_ids: req.body.doc_ids,
    };

    transaction_body.UUID = id;

    const result = await ActiveLogService.createActiveLog(transaction_body);
    res.status(201).json({ message: "New Transaction Created", result });
    console.log(transaction_body);
  } catch (error) {
    console.error("Error creating user transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = createActiveLog;
