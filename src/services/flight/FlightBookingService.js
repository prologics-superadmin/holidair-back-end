const BookingDetails = require("../../models/flightBooking/BookingDetails");
const FlightCustomerAddress = require("../../models/flightBooking/FlightCustomerAddress");
const PaxDetail = require("../../models/flightBooking/PaxDetail");

class FlightBookingService {
  async create(data) {
    try {
      return await BookingDetails.create(data);
    } catch (error) {
      throw error;
    }
  }

  async createFlightCustomerAddress(bookingId, addressData) {
    try {
      const addressesWithBookingId = addressData?.map((addressObject) => {
        return {
          ...addressObject,
          flight_booking_id: bookingId,
        };
      });
      const address = await FlightCustomerAddress.create(
        addressesWithBookingId
      );
      return address;
    } catch (error) {
      console.error("Error creating flight customer address:", error);
      throw error;
    }
  }

  async createPaxDetail(bookingId, paxData) {
    try {
      const paxDetailsWithBookingId = paxData.map((paxObject) => {
        return {
          ...paxObject,
          flight_booking_id: bookingId,
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
      return await BookingDetails.findById(id);
    } catch (error) {
      console.error("Error creating pax detail:", error);
      throw error;
    }
  }
}

module.exports = new FlightBookingService();
