const mongoose = require("mongoose");

const BookingDetailsSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const BookingDetails = mongoose.model("BookingDetails", BookingDetailsSchema);

module.exports = BookingDetails;
