const BookingService = require("../services/BookingService");

class BookingController {
  async getFlightBookings(req, res) {
    try {
      const flightBookings = BookingService.getFlightBookings(req.params);
      res.status(200).json({ data: flightBookings });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async getHotelBookings(req, res) {
    try {
      const hotelBookings = BookingService.getHotelBookings(req.params);
      res.status(200).json({ data: hotelBookings });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

module.exports = new BookingController();
