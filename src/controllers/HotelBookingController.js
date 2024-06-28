const holidayairBookingConfirm = require("../mail/holidayair-booking-confirm");
const holidayairBookingFailed = require("../mail/holidayair-booking-failed");
const sendMail = require("../mail/mail");
const HotelBookingService = require("../services/hotel/HotelBookingService");
const makeHotelApiRequest = require("../utils/hotelRequest");
const jwt = require("jsonwebtoken");

class HotelBookingController {
  async bookHotel(req, res) {
    try {
      let decoded;
      let userId = "";
      const authToken = req.headers["x-access-token"];
      if (authToken.split(" ")[1] !== undefined) {
        decoded = jwt.verify(
          authToken.split(" ")[1],
          process.env.JWT_SECRET_KEY
        );
        userId = decoded.userId;
      }
      const bookingResponse = await HotelBookingService.create(
        req.body,
        userId
      );
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
        // console.log(hotelBookingResponse.booking.hotel.checkOut)
        // await sendMail(bookingResponse.email, "Hotel confirmation", holidayairBookingConfirm(
        //   {
        //     titel: "Hotel",
        //     booking_id: bookingResponse.booking_id,
        //     status: false,
        //     checkIn: hotelBookingResponse.booking.hotel.checkIn,
        //     checkOut: hotelBookingResponse.booking.hotel.checkOut,
        //     location: hotelBookingResponse.booking.hotel.destinationName,
        //     total: hotelBookingResponse.booking.totalSellingRate,
        //     hotelname: hotelBookingResponse.booking.hotel.name
        //   }
        // ));
        res.status(200).json({ data: finalResponse });
      } else {
        // await sendMail(bookingResponse.email, "Hotel Failed", holidayairBookingFailed(
        //   {
        //     titel: "Hotel",
        //     booking_id: bookingResponse.booking_id
        //   }
        // ));
        res.status(500).json({ data: hotelBookingResponse });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

module.exports = new HotelBookingController();
