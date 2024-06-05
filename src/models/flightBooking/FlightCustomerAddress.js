const mongoose = require("mongoose");

const FlightCustomerAddressSchema = new mongoose.Schema(
  {
    flight_booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FlightBooking",
    },
    city_code: {
      type: String,
    },
    area_code: {
      type: String,
    },
    city_name: {
      type: String,
    },
    billing_city_name: {
      type: String,
    },
    country_code: {
      type: String,
    },
    country_name: {
      type: String,
    },
    billing_country_name: {
      type: String,
    },
    house_number: {
      type: String,
    },
    postal_code: {
      type: String,
    },
    address_1: {
      type: String,
    },
  },
  { timestamps: true }
);

const FlightCustomerAddress = mongoose.model(
  "FlightCustomerAddress",
  FlightCustomerAddressSchema
);

module.exports = FlightCustomerAddress;
