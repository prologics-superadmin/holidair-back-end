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
        req.body.Pax
      );
      const bookingResponse = await makeAPIRequest(
        "POST",
        "/flightpnr",
        req.body
      );
      const response = await FlightBookingService.getById(bookingDetails._id);
      if (bookingResponse.result.status === "OK") {
        await FlightBookingService.updateBookingConfirmationDetails(
          bookingDetails._id,
          bookingResponse.result.pnrInfo[0]
        );
        // await sendMail(bookingDetails.email, "booking", "");
        const finalResponse = {
          status: "OK",
          flightBookingResponse: bookingResponse,
          bookingResponse: response,
        };
        res.status(200).json({ data: finalResponse });
      } else {
        res.status(500).json({ error: bookingResponse });
      }
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

  async updateBookingStatus(req, res) {
    try {
      const bookingDetails = await FlightBookingService.updateBookingStatus(
        req.params.bookingId,
        req.body
      );
      res.status(200).json({ data: bookingDetails });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

module.exports = new FlightBookingController();
