const mongoose = require("mongoose");

const BookingDetailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    rate_key: {
      type: String,
    },
    client_reference: {
      type: String,
    },
    email: {
      type: String,
    },
    contact_number: {
      type: String,
    },
    country_code: {
      type: String,
    },
    remark: {
      type: String,
    },
  },
  { timestamps: true }
);

const HotelBookingDetail = mongoose.model(
  "HotelBookingDetail",
  BookingDetailSchema
);

module.exports = HotelBookingDetail;
