const HotelBookingDetail = require("../../models/HotelBooking/BookingDetail");
const PaxDetail = require("../../models/HotelBooking/HotelPaxDetail");

class HotelBookingService {
  async create(data) {
    try {
      return await HotelBookingDetail.create(data);
    } catch (error) {
      throw error;
    }
  }

  async createPaxDetails(bookingId, paxData) {
    try {
      const paxDetailsWithBookingId = paxData.map((paxObject) => {
        return {
          ...paxObject,
          hotel_booking_id: bookingId,
        };
      });
      return await PaxDetail.create(paxDetailsWithBookingId);
    } catch (error) {
      console.error("Error creating pax detail:", error);
      throw error;
    }
  }

  async getById(id) {
    try {
      return await HotelBookingDetail.findById(id);
    } catch (error) {
      console.error("Error creating pax detail:", error);
      throw error;
    }
  }
}

module.exports = new HotelBookingService();
