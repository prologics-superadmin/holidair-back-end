const AttractionBookingDetail = require("../../models/attractionBooking/AttractionBookingDetail");
const AttractionPaxDetail = require("../../models/attractionBooking/AttractionPaxDetail");

class AttractionBookingService {
  async create(data) {
    try {
      console.log(data);
      return AttractionBookingDetail.create(data);
    } catch (error) {
      throw error;
    }
  }

  async createPaxDetails(bookingId, paxDetails) {
    try {
      const paxDetailsWithBookingId = paxDetails.map((paxObject) => {
        return {
          ...paxObject,
          attraction_booking_id: bookingId,
        };
      });
      return await AttractionPaxDetail.create(paxDetailsWithBookingId);
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      return await AttractionBookingDetail.findById(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AttractionBookingService();
