const mongoose = require("mongoose");

const ApiRequestLogSchema = new mongoose.Schema(
  {
    ip_address: {
      type: String,
    },
    location: {
      type: Object,
    },
    device: {
      type: String,
    },
    os: {
      type: String,
    },
    browser: {
      type: String,
    },
    api_endpoint: {
      type: String,
    },
    request_payload: {
      type: Object, // Storing the request payload as an object (e.g., JSON)
    },
    response_payload: {
      type: Object, // Storing the response payload as an object (e.g., JSON)
    },
    success_status: {
      type: Boolean, // Log for successful request/response
    },
    request_headers: {
      type: Object, // Headers sent with the request
    },
    response_headers: {
      type: Object, // Headers received in the response
    },
    timestamp_uk: {
      type: Date, // Timestamp in UK time
      default: Date.now,
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

const ApiRequestLog = mongoose.model("ApiRequestLog", ApiRequestLogSchema);

module.exports = ApiRequestLog;
