const mongoose = require("mongoose");

const BookingRequestSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact_number: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    check_in_date: {
      type: Date,
      required: true,
    },
    check_out_date: {
      type: Date,
      required: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    plan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const BookingRequest = mongoose.model("BookingRequest", BookingRequestSchema);

module.exports = BookingRequest;
