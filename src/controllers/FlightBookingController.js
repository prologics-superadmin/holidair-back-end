const holidayairBookingConfirm = require("../mail/holidayair-booking-confirm");
const holidayairBookingFailed = require("../mail/holidayair-booking-failed");
const sendMail = require("../mail/mail");
const FlightBookingService = require("../services/flight/FlightBookingService");
const HotelBookingService = require("../services/hotel/HotelBookingService");
const makeAPIRequest = require("../utils/flightRequest");
const makeHotelApiRequest = require("../utils/hotelRequest");
const jwt = require("jsonwebtoken");

class FlightBookingController {
  async bookFlight(req, res) {
    try {
      let decoded;
      let userId = "";
      const authToken = req.headers["x-access-token"];
      if (authToken) {
        if (
          authToken.split(" ")[1] !== undefined ||
          authToken.split(" ")[1] !== null ||
          authToken.split(" ")[1] !== ""
        ) {
          decoded = jwt.verify(
            authToken.split(" ")[1],
            process.env.JWT_SECRET_KEY
          );
          userId = decoded.userId;
        }
      }

      const bookingDetails = await FlightBookingService.create(
        req.body,
        userId
      );
      await FlightBookingService.createFlightCustomerAddress(
        bookingDetails._id,
        req.body.AddressInfo
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

      if (
        bookingResponse &&
        bookingResponse.result &&
        bookingResponse.result.status === "OK"
      ) {
        await FlightBookingService.updateBookingConfirmationDetails(
          bookingDetails._id,
          bookingResponse.result.pnrInfo[0],
          bookingResponse.result
        );

        let selectedObject;

        const data =
          bookingResponse.result.airSolutions[0].journey[0].airSegments;

        if (data.length % 2 === 0) {
          // If the length is even, get the middle object
          selectedObject = data[data.length / 2 - 1];
        } else {
          // If the length is odd, get the middle object
          selectedObject = data[Math.floor(data.length / 2)];
        }

        await sendMail(
          response.email,
          "Booking confirmation",
          holidayairBookingConfirm({
            titel: "Flight",
            booking_id: bookingDetails.booking_id,
            status: true,
            from: data[0].origin,
            to: selectedObject.origin,
            departuredate: data[0].departDate,
            arrivaldate: selectedObject.arrivalDate,
            location: data[0].airlineName,
            total: bookingDetails.amount,
          })
        );

        const finalResponse = {
          status: "OK",
          flightBookingResponse: bookingResponse,
          bookingResponse: response,
        };
        res.status(200).json({ data: finalResponse });
      } else {
        await sendMail(
          response.email,
          "Booking Failed",
          holidayairBookingFailed({
            titel: "Flight",
            booking_id: bookingDetails.booking_id,
          })
        );
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
      // Check another string
      if (req.params.bookingId.startsWith("F")) {
        const bookingDetails = await FlightBookingService.updateBookingStatus(
          req.params.bookingId,
          req.body
        );
        const pnrReqParams = {
          AccountInfo: {
            CompanyCode: process.env.HOLIDAY_AIR_COMPANY_CODE,
            WebsiteName: process.env.HOLIDAY_AIR_WEBSITE_NAME,
          },
          BookingRef: bookingDetails.brightsun_reference,
          ApplicationAccessMode:
            process.env.HOLIDAY_AIR_APPLICATION_ACCESS_MODE,
        };
        const flightDetailsResponse = await makeAPIRequest(
          "POST",
          "/Getpnr",
          pnrReqParams
        );

        // const eTicketReqParams = {

        // }

        // const getETicketDetails = await makeAPIRequest("POST", "/Eticket", eTicketReqParams)

        const finalResponse = {
          bookingDetails: bookingDetails,
          bookingConfirmationDetails: flightDetailsResponse,
        };
        res.status(200).json({ data: finalResponse });
      } else if (req.params.bookingId.startsWith("H")) {
        const bookingDetails = await HotelBookingService.updateBookingStatus(
          req.params.bookingId,
          req.body
        );
        const bookingDetailsResponse = await makeHotelApiRequest(
          "GET",
          `hotel-api/3.0/bookings/${bookingDetails.reference}`,
          "",
          ""
        );
        const finalResponse = {
          bookingDetails: bookingDetails,
          bookingConfirmationDetails: bookingDetailsResponse,
        };
        res.status(200).json({ data: finalResponse });
      } else {
        console.log(`${str2} starts with neither 'F' nor 'H'`);
        // Default condition if neither 'F' nor 'H'
      }

      // res.status(200).json({ data: bookingDetails });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async updatePaymentStatus(req, res) {
    try {
      await FlightBookingService.updatePaymentStatus(req.params);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

module.exports = new FlightBookingController();
