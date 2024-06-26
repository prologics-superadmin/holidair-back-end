const generateBookingID = require("../../helpers/bookingIdGenerator");
const BookingDetails = require("../../models/flightBooking/BookingDetails");
const FlightCustomerAddress = require("../../models/flightBooking/FlightCustomerAddress");
const PaxDetail = require("../../models/flightBooking/PaxDetail");

class FlightBookingService {
  async create(data, userId = "") {
    try {
      const transformedData = {
        user_id: userId,
        booking_id: await generateBookingID("FL"),
        key: data.Key,
        trip_type: data.TripType,
        token: data.token,
        supplier: data.supp,
        is_flexible: data.IsFlexible,
        email: data.Email,
        contact_number: data.ContactNo,
        country_code: data.CountryDialingCode,
        amount: data.amount,
      };

      return await BookingDetails.create(transformedData);
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

  async updateBookingStatus(bookingId, data) {
    try {
      const booking = await BookingDetails.findOneAndUpdate(
        { booking_id: bookingId },
        { booking_status: data.booking_status },
        { new: true } // Return the updated document
      );
      if (booking) {
        return booking;
      } else {
        console.log(`No booking found with ID: ${bookingId}`);
        return null;
      }
    } catch (error) {
      console.error("Error creating pax detail:", error);
      throw error;
    }
  }

  async updateBookingConfirmationDetails(id, data, flightData) {
    try {
      const booking = await BookingDetails.findByIdAndUpdate(
        id,
        {
          airline_ref: data.airlineRef,
          brightsun_reference: data.brightsunReference,
          rec_loc: data.recLoc,
          universal_recLoc: data.universalRecLoc,
          flight_data: flightData,
        },
        { new: true } // Return the updated document
      );
      if (booking) {
        return booking;
      } else {
        console.log(`No booking found with ID: ${bookingId}`);
        return null;
      }
    } catch (error) {
      console.error("Error creating pax detail:", error);
      throw error;
    }
  }

  async updatePaymentStatus(data) {
    try {
      if (data.STATUS == 5) {
        await BookingDetails.findOneAndUpdate(
          { booking_id: data.ORDERID },
          { booking_status: "payment-success" },
          { new: true } // Return the updated document
        );
      } else if (data.STATUS == 2) {
        await BookingDetails.findOneAndUpdate(
          { booking_id: data.ORDERID },
          { booking_status: "payment-declined" },
          { new: true } // Return the updated document
        );
      }
    } catch (error) {
      console.error("Error creating pax detail:", error);
      throw error;
    }
  }
}

module.exports = new FlightBookingService();
