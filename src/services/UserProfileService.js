const HotelBookingDetail = require("../models/HotelBooking/BookingDetail");
const { User } = require("../models/UserManagement/User");
const BookingDetails = require("../models/flightBooking/BookingDetails");
const formatCurrency = require("../utils/formatCurrency");
const HotelBookingService = require("./hotel/HotelBookingService");
const moment = require("moment");

class UserProfileService {
  async getBookingData(userId) {
    try {
      const user = await User.findById(userId);
      const query = {
        $or: [{ user_id: userId }, { email: user.email }],
      };
      const flightBooking = await BookingDetails.find(query);

      if (!flightBooking || flightBooking.length === 0) {
        return res.status(404).json({ message: "No booking details found" });
      }

      // Add a display ID to each booking detail
      const flightBookingWithDisplayId = flightBooking.map((booking, index) => {
        return {
          id: index + 1,
          amount: formatCurrency(booking.amount),
          booking_status: booking.booking_status,
          trip_type:
            booking.trip_type === "RT"
              ? "Round Trip"
              : booking.trip_type === "OW"
              ? "One Way"
              : "Multi City",
          // email: booking.email,
          provider_reference: booking.brightsun_reference,
          booking_id: booking.booking_id,
          created_at: moment(booking.createdAt).format("YYYY-MM-DD HH:mm:ss"),
          origin:
            booking.flight_data != undefined
              ? booking.flight_data.airSolutions[0].journey[0].airSegments[0]
                  .origin
              : "",
        };
      });

      const hotelBookings = await HotelBookingDetail.find(query);

      const hotelBookingWithDisplayId = hotelBookings.map((booking, index) => {
        return {
          id: index + 1,
          amount: formatCurrency(booking.hotel_data.pendingAmount),
          booking_status: booking.booking_status,
          reference: booking.reference,
          email: booking.email,
          provider_reference: booking.brightsun_reference,
          booking_id: booking.booking_id,
        };
      });

      return {
        flightBooking: flightBookingWithDisplayId,
        hotelBookings: hotelBookingWithDisplayId,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserProfileService();
