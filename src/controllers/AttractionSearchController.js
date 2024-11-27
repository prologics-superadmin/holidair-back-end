const sendErrorNotificationEmail = require("../helpers/genaralHelper");
const { getAdultPaxAmountRange } = require("../helpers/hotelSearchHelper");
const makeAttractionApiRequest = require("../utils/attractionRequest");

class AttractionSearchController {
  async searchAttractions(req, res) {
    try {
      const response = await makeAttractionApiRequest(
        "POST",
        "availability",
        req.body
      );

      const { highestAmount, lowestAmount } = await getAdultPaxAmountRange(
        response.activities
      );

      res.status(200).json({
        data: response,
        searchCriteria: {
          minPrice: parseFloat(lowestAmount),
          maxPrice: parseFloat(highestAmount),
        },
      });
    } catch (error) {
      await sendErrorNotificationEmail(
        "",
        error,
        "",
        "Attraction search API Error"
      );
      res.status(500).json({ error: error });
    }
  }

  async getSelectedAttractionDetails(req, res) {
    try {
      const response = await makeAttractionApiRequest(
        "POST",
        "details",
        req.body
      );
      res.status(200).json({ data: response });
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
