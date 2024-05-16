const { date } = require("joi");
const { request } = require("../utils/request");
const makeAPIRequest = require("../utils/request");

class FlightSearchController {
  async searchFlights(req, res) {
    try {
      const response = await makeAPIRequest("post", "/flightsearch", req.body);
      if (response.result.status === "OK") {
        res.status(200).json({ data: response.result.airSolutions });
      } else {
        res.status(500).json({ error: "API ERROR" });
      }
    } catch (_) {
      res.status(500).json({ error: "Internal server error " });
    }
  }
}

module.exports = new FlightSearchController();
