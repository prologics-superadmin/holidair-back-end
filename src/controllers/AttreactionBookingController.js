const AttractionBookingService = require("../services/attraction/AttractionBookingService");

class AttractionBookingController {
  async bookAttraction(req, res) {
    try {
      const bookingDetails = await AttractionBookingService.create(req.body);
      await AttractionBookingService.createPaxDetails(
        bookingDetails._id,
        req.body.pax_details
      );
      const response = AttractionBookingService.getById(bookingDetails._id);
      res.status(200).json({ data: response });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

module.exports = new AttractionBookingController();
