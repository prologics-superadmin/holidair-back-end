const HotelBookingDetail = require("../models/HotelBooking/BookingDetail");
const BookingDetails = require("../models/flightBooking/BookingDetails");

class BookingService {
  async getFlightBookings(data) {
    try {
      const itemsPerPage = data.dataPerPage;
      const page = parseInt(data.currentPageIndex) || 1;
      const skip = (page - 1) * itemsPerPage;

      const filters = data.filters || {};
      let query = {};
      //   query = {
      //     $or: [{ user_id: data.userId }, { email: data.email }],
      //   };
      const flightBooking = await BookingDetails.find(query)
        .skip(skip)
        .limit(itemsPerPage);
      const count = await BookingDetails.countDocuments(query);
      const dataResponse = flightBooking.map((booking, index) => {
        return {
          id: index + 1,
          amount: booking.amount,
          booking_status: booking.booking_status,
          trip_type: booking.trip_type,
          email: booking.email,
          provider_reference: booking.brightsun_reference,
          booking_id: booking.booking_id,
        };
      });
      if (result.length === 0) {
        response = {
          data: [],
          dataCount: count,
          currentPaginationIndex: page,
          dataPerPage: itemsPerPage,
          message: "There are not matching records.",
        };
      } else {
        response = {
          data: dataResponse,
          dataCount: count,
          currentPaginationIndex: page,
          dataPerPage: itemsPerPage,
          message: "Data returned",
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async getHotelBookings(data) {
    try {
      const query = {
        $or: [{ user_id: userId }, { email: data.email }],
      };
      const hotelBookings = HotelBookingDetail.find(query);
      return hotelBookings.map((booking, index) => {
        return {
          id: index + 1,
          amount: booking.hotel_data.pendingAmount,
          booking_status: booking.booking_status,
          reference: booking.reference,
          email: booking.email,
          provider_reference: booking.brightsun_reference,
          booking_id: booking.booking_id,
        };
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new BookingService();
