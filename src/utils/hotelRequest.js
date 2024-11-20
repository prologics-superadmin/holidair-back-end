const axios = require("axios");
const crypto = require("crypto");

const baseURL = process.env.HOTEL_URL;

async function makeHotelApiRequest(method, endpoint, body = {}, reqBody = {}) {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const toHash = `${process.env.HOTELBEDS_API_KEY}${process.env.HOTELBEDS_API_SECRET}${timestamp}`;
    const xSignature = crypto.createHash("sha256").update(toHash).digest("hex");
    const url = `${baseURL}/${endpoint}`;
    const headers = {
      "Api-key": process.env.HOTELBEDS_API_KEY,
      "X-Signature": xSignature,
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate, br",
    };

    // Axios request options
    const options = {
      method: method,
      url: url,
      headers: headers,
      params: body,
      data: reqBody, // Add query parameters
    };
    console.log(options);
    const response = await axios(options);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = makeHotelApiRequest;
