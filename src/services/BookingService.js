const HotelBookingDetail = require("../models/HotelBooking/BookingDetail");
const { User } = require("../models/UserManagement/User");
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
      const dataResponse = await Promise.all(flightBooking.map(async (booking, index) => {
        const user = await User.findById(booking.user_id);
        return {
          id: booking.booking_id,
          customer_name: user.user_name,
          email: booking.email,
          provider_reference: booking.brightsun_reference ? booking.brightsun_reference : "",
          trip_type: booking.trip_type,
          amount: booking.amount,
          contact_number: booking.contact_number,
          booking_status: booking.booking_status,
        };
      }));

      let response;

      if (dataResponse.length === 0) {
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
      // console.log(response)

      return response;

    } catch (error) {
      throw error;
    }
  }

  async getHotelBookings(data) {
    try {
      const itemsPerPage = data.dataPerPage;
      const page = parseInt(data.currentPageIndex) || 1;
      const skip = (page - 1) * itemsPerPage;

      const filters = data.filters || {};
      let query = {};
      //   query = {
      //     $or: [{ user_id: data.userId }, { email: data.email }],
      //   };
      const hotelBookings = await HotelBookingDetail.find(query)
        .skip(skip)
        .limit(itemsPerPage);
      const count = await HotelBookingDetail.countDocuments(query);


      const dataResponse = hotelBookings.map((booking, index) => {
        return {
          id: booking.booking_id,
          customer_name: booking.name + ' ' + booking.surname,
          email: booking.email,
          provider_reference: booking.reference ? booking.reference : "",
          trip_type: booking.trip_type,
          hotel_name: booking.hotel_data ? booking.hotel_data.hotel.name : "",
          amount: booking.hotel_data ? booking.hotel_data.totalSellingRate : "",
          booking_date: booking.hotel_data ? booking.hotel_data.hotel.checkIn : "",
          booking_status: booking.booking_status,
          createdAt: booking.createdAt,

        };
      });

      let response;

      if (dataResponse.length === 0) {
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
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new BookingService();
