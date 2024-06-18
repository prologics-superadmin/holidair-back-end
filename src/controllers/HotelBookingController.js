const HotelBookingService = require("../services/hotel/HotelBookingService");
const makeHotelApiRequest = require("../utils/hotelRequest");

class HotelBookingController {
  async bookHotel(req, res) {
    try {
      const bookingResponse = await HotelBookingService.create(req.body);
      await HotelBookingService.createPaxDetails(
        bookingResponse._id,
        req.body.rooms
      );
      const hotelBookingResponse = await makeHotelApiRequest(
        "POST",
        "hotel-api/3.0/bookings",
        "",
        req.body
      );
      if (hotelBookingResponse.booking.status === "CONFIRMED") {
        await HotelBookingService.updateHotelBookingConfirmationDetails(
          bookingResponse._id,
          hotelBookingResponse
        );
        const finalResponse = {
          status: "OK",
          hotelBookingResponse: hotelBookingResponse,
          bookingResponse: bookingResponse,
        };
        res.status(200).json({ data: finalResponse });
      } else {
        res.status(500).json({ data: hotelBookingResponse });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

module.exports = new HotelBookingController();
