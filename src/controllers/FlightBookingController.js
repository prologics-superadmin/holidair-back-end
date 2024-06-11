const sendMail = require("../mail/mail");
const FlightBookingService = require("../services/flight/FlightBookingService");
const makeAPIRequest = require("../utils/flightRequest");

class FlightBookingController {
  async bookFlight(req, res) {
    try {
      const bookingDetails = await FlightBookingService.create(req.body);
      await FlightBookingService.createFlightCustomerAddress(
        bookingDetails._id,
        req.body.addresses
      );
      await FlightBookingService.createPaxDetail(
        bookingDetails._id,
        req.body.passengers
      );
      const response = await FlightBookingService.getById(bookingDetails._id);
      await sendMail(bookingDetails.email, "booking", "");
      res.status(200).json({ data: response });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async getSelectedFlightPriceSearch(req, res) {
    try {
      const response = await makeAPIRequest("post", "/flightprice", req.body);
      res.status(200).json({ data: response });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

module.exports = new FlightBookingController();
