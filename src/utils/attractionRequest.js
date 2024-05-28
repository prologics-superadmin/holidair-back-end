const axios = require("axios");
const crypto = require("crypto");

const baseURL = process.env.ATTRACTION_URL;

async function makeAttractionApiRequest(method, endpoint, body) {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const toHash = `${process.env.ATTRACTION_API_KEY}${process.env.ATTRACTION__API_SECRET}${timestamp}`;
    const xSignature = crypto.createHash("sha256").update(toHash).digest("hex");
    const url = `${baseURL}/${endpoint}`;

    const headers = {
      "Api-key": process.env.ATTRACTION_API_KEY,
      "X-Signature": xSignature,
      Accept: "application/json",
      "Accept-Encoding": "gzip",
      "Content-Type": "application/json",
    };

    const options = {
      method: method,
      url: url,
      headers: headers,
      //   params: "", // Add query parameters
      data: JSON.stringify(body),
    };

    const response = await axios(options);
    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = makeAttractionApiRequest;
