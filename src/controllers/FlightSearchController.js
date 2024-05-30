const { date } = require("joi");

const {
  getStopValues,
  getUniqueBaggageAllowances,
  getUniqueAirports,
  getUniqueTotalFlightDurations,
  getHighestAndLowestPrices,
  getAirportCodes,
} = require("../helpers/flightSearchHelper");
const makeAPIRequest = require("../utils/flightRequest");

class FlightSearchController {
  async searchFlights(req, res) {
    try {
      const response = await makeAPIRequest("post", "/flightsearch", req.body);
      console.log("response")
      console.log(response)
      if (response.result.status === "OK") {
        const { highest, lowest } = await getHighestAndLowestPrices(
          response.result.airSolutions
        );
        const stops = await getStopValues(response.result.airSolutions);
        const flightDurations = await getUniqueTotalFlightDurations(
          response.result.airSolutions
        );
        const baggageAllowances = await getUniqueBaggageAllowances(
          response.result.airSolutions
        );
        const airports = await getUniqueAirports(response.result.airSolutions);

        const airportCodes = await getAirportCodes(
          response.result.airSolutions
        );

        const responseData = {
          flightResults: response.result.airSolutions,
          token: response.result.token,
          searchCriteria: {
            minPrice: lowest,
            maxPrice: highest,
            stops: stops,
            flightDurations: flightDurations,
            baggageAllowances: baggageAllowances,
            airports: airports,
            airportCodes: airportCodes,
          },
        };
        res.status(200).json({ data: responseData });
      } else {
        res.status(500).json({ error: "API ERROR" });
      }
    } catch (error) {
      res.status(500).json({ error: error });
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

  async getFareRules(req, res) {
    try {
      const response = await makeAPIRequest("POST", "/FareRule", req.body);

      res.status(200).json({ data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error " });
    }
  }
}

module.exports = new FlightSearchController();
