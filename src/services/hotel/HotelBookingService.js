const generateBookingID = require("../../helpers/bookingIdGenerator");
const HotelBookingDetail = require("../../models/HotelBooking/BookingDetail");
const PaxDetail = require("../../models/HotelBooking/HotelPaxDetail");

class HotelBookingService {
  async create(data, userId) {
    try {
      const transformedData = {
        user_id: userId,
        booking_id: await generateBookingID("HT"),
        name: data.holder.name,
        surname: data.holder.surname,
        rate_key: "",
        email: data.email, // Ensure email is part of the input data
        reference: data.clientReference,
        creation_date: new Date(),
        amount: data.amount, // Ensure amount is part of the input data
        contact_number: data.contactNo, // Ensure contactNo is part of the input data
        country_code: data.countryDialingCode, // Ensure countryDialingCode is part of the input data
        remark: data.remark,
      };

      return await HotelBookingDetail.create(transformedData);
    } catch (error) {
      throw error;
    }
  }

  async createPaxDetails(bookingId, paxData) {
    try {
      const paxDetailsWithBookingId = paxData.flatMap((room) =>
        room.paxes.map((pax) => ({
          hotel_booking_id: bookingId,
          type: pax.type,
          name: pax.name,
          surname: pax.surname,
        }))
      );

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

  async updateHotelBookingConfirmationDetails(id, data) {
    try {
      const booking = HotelBookingDetail.findByIdAndUpdate(
        id,
        {
          reference: data.booking.reference,
          hotel_data: data.booking,
        },
        { new: true }
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

  async updateBookingStatus(bookingId, data) {
    try {
      const booking = await HotelBookingDetail.findOneAndUpdate(
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
}

module.exports = new HotelBookingService();
