const BookingService = require("../services/BookingService");

class BookingController {
  async getFlightBookings(req, res) {
    try {
      const flightBookings = await BookingService.getFlightBookings(req.body);
      res.status(200).json(flightBookings);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async getHotelBookings(req, res) {
    try {
      const hotelBookings = await BookingService.getHotelBookings(req.body);
      res.status(200).json(hotelBookings);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

module.exports = new BookingController();
