const HotelBookingService = require("../services/hotel/HotelBookingService");

class HotelBookingController {
  async bookHotel(req, res) {
    try {
      const bookingResponse = await HotelBookingService.create(req.body);
      await HotelBookingService.createPaxDetails(
        bookingResponse._id,
        req.body.passengers
      );
      const response = await HotelBookingService.getById(bookingResponse._id);
      res.status(200).json({ data: response });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

module.exports = new HotelBookingController();
