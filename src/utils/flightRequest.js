const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Base URL
const baseURL = process.env.FLIGHT_URL;

async function makeAPIRequest(method, endpoint, body) {
  try {
    const url = `${baseURL}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      // Add any additional headers if needed
    };

    // Add Basic Auth headers if credentials are provided
    const username = process.env.FLIGHT_API_USERNAME;
    const password = process.env.FLIGHT_API_PASSWORD;

    if (username && password) {
      headers["Authorization"] = `Basic ${Buffer.from(
        `${username}:${password}`
      ).toString("base64")}`;
    }

    const options = {
      method: method.toUpperCase(),
      url: url,
      headers: headers,
      data: body, // Add request body if method is POST
    };

    const response = await axios(options);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
}

module.exports = makeAPIRequest;
