const generateBookingID = require("../../helpers/bookingIdGenerator");
const BookingDetails = require("../../models/flightBooking/BookingDetails");
const FlightCustomerAddress = require("../../models/flightBooking/FlightCustomerAddress");
const PaxDetail = require("../../models/flightBooking/PaxDetail");
const mongoose = require("mongoose");

class FlightBookingService {
  async create(data, userId) {
    try {
      const transformedData = {
        user_id: userId ?? "",
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
        markup_amount: data.markup_value,
      };

      return await BookingDetails.create(transformedData);
    } catch (error) {
      throw error;
    }
  }

  async createFlightCustomerAddress(bookingId, addressData) {
    try {
      const addressObject = {
        flight_booking_id: bookingId,
        city_code: addressData.City.CityCode,
        area_code: addressData.City.AreaCode,
        city_name: addressData.City.CityName,
        billing_city_name: addressData.City.BillingCityName,
        country_code: addressData.Country.CountryCode,
        country_name: addressData.Country.CountryName,
        billing_country_name: addressData.Country.BillingCountryName,
        house_number: addressData.Street.HouseNo,
        postal_code: addressData.Street.PostalCode,
        address_1: addressData.Street.Address1,
        address_2: addressData.Street.Address2,
        address_3: addressData.Street.Address3,
      };

      const address = await FlightCustomerAddress.create(addressObject);
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
          flight_booking_id: bookingId,
          title: paxObject.Title,
          first_name: paxObject.FirstName,
          middle_name: paxObject.MiddelName, // Correct any misspellings here
          last_name: paxObject.LastName,
          pax_type: paxObject.PaxType,
          gender: paxObject.Gender,
          pax_dob: new Date(paxObject.PaxDOB), // Ensure PaxDOB is converted to a Date object
          is_lead_name: paxObject.IsLeadName,
        };
      });
      return await PaxDetail.insertMany(paxDetailsWithBookingId);
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

  async getPaxDetailsByBookingId(bookingId) {
    try {
      const paxDetails = await PaxDetail.find({ flight_booking_id: bookingId })
        .populate("flight_booking_id") // Populating flight_booking_id reference if needed
        .exec();

      return paxDetails;
    } catch (error) {
      console.error("Error creating pax detail:", error);
      throw error;
    }
  }

  async updatePenAirOderId(bookingId, penAirId, transactionId, taxId) {
    try {
      return await BookingDetails.findByIdAndUpdate(
        bookingId, // This should be the _id of the document
        {
          penair_order_id: penAirId,
          transaction_id: transactionId,
          tax_id: taxId,
        }, // The update object
        { new: true, useFindAndModify: false } // Options: return the updated document
      );
    } catch (error) {
      console.error("Error creating penair id:", error);
      throw error;
    }
  }

  async mainPaxDetails(bookingId) {
    try {
      // Find the lead passenger (where is_lead_name is true) by flight_booking_id
      const leadPax = await PaxDetail.findOne({
        flight_booking_id: bookingId,
        is_lead_name: true,
      });

      if (!leadPax) {
        throw new Error(
          "Lead passenger not found for the provided booking ID."
        );
      }

      // Combine first name, middle name, and last name to form the full name
      const fullName = `${leadPax.first_name || ""} ${
        leadPax.middle_name || ""
      } ${leadPax.last_name || ""}`.trim();

      return fullName;
    } catch (error) {
      console.error("Error creating penair id:", error);
      throw error;
    }
  }
}

module.exports = new FlightBookingService();
