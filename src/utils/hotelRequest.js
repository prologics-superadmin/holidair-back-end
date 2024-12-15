const axios = require("axios");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const baseURL = process.env.HOTEL_URL;

// Define log file paths in the logs folder
const logsFolder = path.join(__dirname, "../logs");
const requestLogPath = path.join(logsFolder, "request.json");
const responseLogPath = path.join(logsFolder, "response.json");
const errorLogPath = path.join(logsFolder, "error.json");

// Ensure logs folder exists
if (!fs.existsSync(logsFolder)) {
  fs.mkdirSync(logsFolder, { recursive: true });
}

async function makeHotelApiRequest(method, endpoint, body = "", reqBody = "") {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const toHash = `${process.env.HOTELBEDS_API_KEY}${process.env.HOTELBEDS_API_SECRET}${timestamp}`;
    const xSignature = crypto.createHash("sha256").update(toHash).digest("hex");
    const url = `${baseURL}/${endpoint}`;
    const headers = {
      "Api-key": process.env.HOTELBEDS_API_KEY,
      "X-Signature": xSignature,
      Accept: "application/json",
      "Accept-Encoding": "gzip",
    };

    // Axios request options
    const options = {
      method: method,
      url: url,
      headers: headers,
      params: body,
      data: reqBody, // Add query parameters
    };

    // console.log(options);

    // Log the request to the request.json file

    const response = await axios(options);

    // Log the response to the response.json file

    return response.data;
  } catch (error) {
    console.log(error);
    // Log the error to the error.json file
    // throw error;
  }
}

module.exports = makeHotelApiRequest;
