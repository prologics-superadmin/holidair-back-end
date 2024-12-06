const getClientIp = require("../helpers/genaralHelper");
const sendErrorNotificationEmail = require("../helpers/genaralHelper");
const { getAdultPaxAmountRange } = require("../helpers/hotelSearchHelper");
const ApiRequestLogService = require("../services/ApiRequestLogService");
const makeAttractionApiRequest = require("../utils/attractionRequest");

class AttractionSearchController {
  async searchAttractions(req, res) {
    const ip = await getClientIp(req);
    try {
      const response = await makeAttractionApiRequest(
        "POST",
        "availability",
        req.body.params
      );

      if (response.activities) {
        const { highestAmount, lowestAmount } = await getAdultPaxAmountRange(
          response.activities
        );

        await ApiRequestLogService.create({
          request: req.body.params,
          response: response,
          browserData: req.body.browserData,
          ip: ip,
          success_status: true,
          endpoint: "activity search",
        });

        res.status(200).json({
          data: response,
          searchCriteria: {
            minPrice: parseFloat(lowestAmount),
            maxPrice: parseFloat(highestAmount),
          },
        });
      } else {
        await ApiRequestLogService.create({
          request: req.body.params,
          response: response,
          browserData: req.body.browserData,
          ip: ip,
          success_status: false,
          endpoint: "activity search",
        });
      }
    } catch (error) {
      await ApiRequestLogService.create({
        request: req.body.params,
        response: response,
        browserData: req.body.browserData,
        ip: ip,
        success_status: false,
        endpoint: "activity search",
      });
      // await sendErrorNotificationEmail(
      //   "",
      //   error,
      //   "",
      //   "Attraction search API Error"
      // );
      res.status(500).json({ error: error });
    }
  }

  async getSelectedAttractionDetails(req, res) {
    const ip = await getClientIp(req);
    try {
      const response = await makeAttractionApiRequest(
        "POST",
        "details",
        req.body.params
      );
      console.log(response);
      if (response.activity) {
        await ApiRequestLogService.create({
          request: req.body.params,
          response: response,
          browserData: req.body.browserData,
          ip: ip,
          success_status: true,
          endpoint: "activity get",
        });
        res.status(200).json({ data: response });
      } else {
        await ApiRequestLogService.create({
          request: req.body.params,
          response: response,
          browserData: req.body.browserData,
          ip: ip,
          success_status: false,
          endpoint: "activity get",
        });
      }
    } catch (error) {
      await sendErrorNotificationEmail(
        "",
        error,
        "",
        "Attraction select API Error"
      );
      res.status(500).json({ error: error });
    }
  }
}

module.exports = new AttractionSearchController();
