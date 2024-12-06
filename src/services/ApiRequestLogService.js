const ApiRequestLog = require("../models/ApiRequestLog");
const moment = require("moment-timezone");

class ApiRequestLogService {
  /**
   * Create a new API request log entry.
   * @param {Object} data - The log data to be stored.
   * @returns {Promise<Object>} - The created log entry.
   */
  async create(data) {
    try {
      const logEntry = {
        ip_address: data.ip,
        location: data.browserData?.coordinates ?? {},
        device: data.browserData.deviceInfo.ua,
        os: data.browserData.os.name,
        browser: data.browserData.browser.name,
        api_endpoint: data.endpoint,
        request_payload: data.request,
        response_payload: data.response,
        success_status: data.success_status,
        request_headers: "",
        response_headers: "",
        timestamp_uk: moment().tz("Europe/London").toDate(),
      };

      return await ApiRequestLog.create(logEntry);
    } catch (error) {
      console.error("Error creating API request log:", error);
      throw error;
    }
  }

  /**
   * Get a single API request log by its ID.
   * @param {String} id - The ID of the log entry.
   * @returns {Promise<Object>} - The found log entry.
   */
  async getById(id) {
    try {
      return await ApiRequestLog.findById(id);
    } catch (error) {
      console.error("Error retrieving API request log by ID:", error);
      throw error;
    }
  }

  /**
   * Get all API request logs with optional filtering and pagination.
   * @param {Object} filters - Query filters to apply (e.g., by endpoint).
   * @param {Number} limit - Number of logs to retrieve (default: 100).
   * @param {Number} page - The page number for pagination (default: 1).
   * @returns {Promise<Object[]>} - The list of logs.
   */
  async getAll(data) {
    try {
      const page = parseInt(data.currentPageIndex) || 1;
      const filters = data.filters || {};
      const search = data.search;
      const itemsPerPage = data.dataPerPage;
      const skip = (page - 1) * itemsPerPage;
      console.log(filters);

      const query = { ...filters };
      const result = await ApiRequestLog.find(query)
        .sort({ timestamp_uk: -1 })
        .skip(skip)
        .limit(itemsPerPage);
      const count = await ApiRequestLog.countDocuments(query);
      let response = {};

      if (count <= 0) {
        response = {
          data: [],
          dataCount: 0,
          currentPaginationIndex: page,
          dataPerPage: 20,
          message: "There are not matching records.",
        };
      } else {
        response = {
          data: result.map((log) => {
            const timestamp = new Date(log.timestamp_uk);
            const date = timestamp.toISOString().split("T")[0]; // Extract date (YYYY-MM-DD)
            const time = timestamp.toISOString().split("T")[1].split(".")[0]; // Extract time (HH:mm:ss)

            return {
              _id: log._id,
              ip_address: log.ip_address,
              location: log.location,
              // device: log.device, // Commented out as per original code
              os: log.os,
              browser: log.browser,
              api_endpoint: log.api_endpoint,
              request_payload: log.request_payload,
              response_payload: log.response_payload,
              success_status: log.success_status ? "Success" : "Failed", // Convert to "Success" or "Failed"
              date: date, // Add separate date field
              time: time, // Add separate time field
              $bg: log.success_status ? "" : "#e65c6e",
            };
          }),
          dataCount: count,
          currentPaginationIndex: page,
          dataPerPage: 10,
          message: result.length
            ? "Data retrieved successfully."
            : "There are no matching records.",
        };
      }
      return response;
    } catch (error) {
      console.error("Error retrieving all API request logs:", error);
      throw error;
    }
  }
}

module.exports = new ApiRequestLogService();
