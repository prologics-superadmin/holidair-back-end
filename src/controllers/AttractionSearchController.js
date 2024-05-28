const makeAttractionApiRequest = require("../utils/attractionRequest");

class AttractionSearchController {
  async searchAttractions(req, res) {
    try {
      const response = await makeAttractionApiRequest(
        "POST",
        "availability",
        req.body
      );
      res.status(200).json({ data: response });
    } catch (error) {
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
      res.status(500).json({ error: error });
    }
  }
}

module.exports = new AttractionSearchController();
