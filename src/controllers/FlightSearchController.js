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

  async airportSearch(req, res) {
    try {
      const airportDetails = [];
      const response = await makeAPIRequest(
        "get",
        `/AutoComplete/${req.params.text}`
      );
      response.forEach((item) => {
        const match = item.AIRPORT.match(/^(.*)\[(.*)\](.*)$/);
        const nameValue = item.AIRPORT;
        if (match) {
          const name = nameValue;
          const code = match[2];
          airportDetails.push({ name, code });
        }
      });
      res.status(200).json({ data: airportDetails });
    } catch (_) {
      res.status(500).json({ error: "Internal server error " });
    }
  }
}

module.exports = new FlightSearchController();
