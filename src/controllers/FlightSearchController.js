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
const { getPrice } = require("../services/MarkupPriceService");
const MarkupPriceService = require("../services/MarkupPriceService");
const MarkupService = require("../services/MarkupService");
const sendErrorNotificationEmail = require("../helpers/genaralHelper");
const ApiRequestLogService = require("../services/ApiRequestLogService");
const getClientIp = require("../helpers/genaralHelper");

class FlightSearchController {
  async searchFlights(req, res) {
    const ip = await getClientIp(req);
    // try {
    const response = await makeAPIRequest(
      "post",
      "/flightsearch",
      req.body.params
    );

    if (response.result && response.result.status === "OK") {
      await ApiRequestLogService.create({
        request: req.body.params,
        response: response.result,
        browserData: req.body.browserData,
        ip: ip,
        success_status: true,
        endpoint: "flight search",
      });

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

      const airportCodes = await getAirportCodes(response.result.airSolutions);

      const flightMarkupPrice = await MarkupService.getMarkupByType("Flight");

      const responseData = {
        flightResults: response.result.airSolutions,
        // flightMarkupPrice: flightMarkupPrice.amount ?? 0,
        flightMarkupPrice: 0,
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
      await ApiRequestLogService.create({
        request: req.body.params,
        response: JSON.stringify(response),
        browserData: req.body.browserData,
        ip: ip,
        success_status: false,
        endpoint: "flight search",
      });
      // await sendErrorNotificationEmail(
      //   "",
      //   "admin@holidayair.com",
      //   "error",
      //   "",
      //   "Brightsun Flight search API Error"
      // );
      res.status(500).json({ error: "API ERROR" });
    }
    // } catch (error) {
    //   await sendErrorNotificationEmail(
    //     "",

    //     error,
    //     "",
    //     "Brightsun Flight search API Error"
    //   );
    //   res.status(500).json({ error: error });
    // }
  }

  async airportSearch(req, res) {
    // try {
    let airportDetails = [];
    const response = await makeAPIRequest(
      "get",
      `/AutoComplete/${req.params.text}`
    );

    // if (response.length > 0) {
    response.forEach((item) => {
      const match = item.AIRPORT.match(/^(.*)\[(.*)\](.*)$/);
      const nameValue = item.AIRPORT;
      if (match) {
        const name = nameValue;
        const code = match[2];
        airportDetails.push({ name, code });
      }
    });
    // } else {
    //   airportDetails = [];
    // }

    // await ApiRequestLogService.create({
    //   request: req.params.text,
    //   response: response,
    //   browserData: req.body,
    //   ip: ip,
    //   success_status: true,
    //   endpoint: "airport search",
    // });
    res.status(200).json({ data: airportDetails });
    // } else {
    // await ApiRequestLogService.create({
    //   request: req.body.params,
    //   response: response.result,
    //   browserData: req.body.browserData,
    //   ip: ip,
    //   success_status: false,
    //   endpoint: "airport search",
    // });
    // }

    // res.status(200).json({ data: "" });
    // } catch (error) {
    //   await sendErrorNotificationEmail(
    //     "",

    //     error,
    //     "",
    //     "Brightsun Airport list API Error"
    //   );
    //   res.status(500).json({ error: "Internal server error " });
    // }
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
