const mongoose = require("mongoose");

const BookingDetailsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    booking_id: {
      type: String,
    },
    airline_ref: {
      type: String,
    },
    brightsun_reference: {
      type: String,
    },
    rec_loc: {
      type: String,
    },
    universal_rec_loc: {
      type: String,
    },
    amount: {
      type: Number,
    },
    markup_amount: {
      type: Number,
    },
    booking_status: {
      type: String,
      default: "booking-created",
    },
    key: {
      type: String,
    },
    trip_type: {
      type: String,
    },
    token: {
      type: String,
    },
    supplier: {
      type: String,
    },
    is_flexible: {
      type: Boolean,
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
    penair_order_id: {
      type: String,
    },
    transaction_id: {
      type: String,
    },
    tax_id: {
      type: String,
    },
    flight_data: {
      type: Object,
    },
  },
  { timestamps: true }
);

const BookingDetails = mongoose.model("BookingDetails", BookingDetailsSchema);

module.exports = BookingDetails;
