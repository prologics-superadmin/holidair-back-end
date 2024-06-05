const makeHotelApiRequest = require("../utils/hotelRequest");

class HotelSearchController {
  async searchHotels(req, res) {
    try {
      const response = await makeHotelApiRequest("GET", "hotels", req.body);
      res.status(200).json({ data: response });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async getHotelContent(req, res) {
    try {
      const params = `hotels/${req.params.id}/details`;
      const response = await makeHotelApiRequest("GET", params, {});
      console.log(response);
      res.status(200).json({ data: response });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

module.exports = new HotelSearchController();
