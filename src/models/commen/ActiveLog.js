const mongoose = require('mongoose');

const ActiveLogSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  function_name: {
    type: String,
    required: true
  },
  UUID: {
    type: String,
    required: true
  },
  device: {
    type: String,
    required: true,
  },
  ip_address: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  browser: {
    type: String,
    required: true,
  },
  os: {
    type: String,
    required: false,
  },
  doc_ids: {
    type: [String],
    required: false,
  },
}, { timestamps: true });

const ActiveLog = mongoose.model('ActiveLog', ActiveLogSchema);

module.exports = ActiveLog;
