const { User } = require("../models/UserManagement/User");
const BookingDetails = require("../models/flightBooking/BookingDetails");
const HotelBookingService = require("./hotel/HotelBookingService");

class UserProfileService {
  async getBookingData(userId) {
    try {
      const query = {};
      const user = User.findById(userId);
      query.user_id = userId;
      query.email = user.email;

      const flightBooking = await BookingDetails.find(query);
      const hotelBookings = await HotelBookingService.find(query);
      return { flightBooking: flightBooking, hotelBookings: hotelBookings };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserProfileService();
