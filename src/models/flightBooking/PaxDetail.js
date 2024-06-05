const mongoose = require("mongoose");

const PaxDetailSchema = new mongoose.Schema(
  {
    flight_booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FlightBooking",
    },
    title: { type: String },
    first_name: { type: String },
    middle_name: { type: String },
    last_name: { type: String },
    pax_type: { type: String },
    gender: { type: String },
    pax_dob: { type: Date },
    is_lead_name: { type: Boolean },
  },
  { timestamps: true }
);

const PaxDetail = mongoose.model("PaxDetail", PaxDetailSchema);

module.exports = PaxDetail;
