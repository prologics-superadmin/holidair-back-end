const mongoose = require("mongoose");

const BookingDetailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    booking_id: {
      type: String,
    },
    booking_status: {
      type: String,
      default: "booking-created",
    },
    surname: {
      type: String,
    },
    rate_key: {
      type: String,
    },
    email: {
      type: String,
    },
    reference: {
      type: String,
    },
    creation_date: {
      type: Date,
    },
    amount: {
      type: Number,
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
