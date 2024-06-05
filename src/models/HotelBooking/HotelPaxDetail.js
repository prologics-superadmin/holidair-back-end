const mongoose = require("mongoose");

const HotelPaxDetailSchema = new mongoose.Schema(
  {
    hotel_booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HotelBookingDetail",
    },
    type: { type: String },
    name: { type: String },
    surname: { type: String },
    is_lead_name: { type: Boolean },
  },
  { timestamps: true }
);

const HotelPaxDetail = mongoose.model("HotelPaxDetail", HotelPaxDetailSchema);

module.exports = HotelPaxDetail;
