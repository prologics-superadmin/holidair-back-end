const mongoose = require("mongoose");

const AttractionPaxDetailSchema = new mongoose.Schema({
  attraction_booking_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AttractionBookingDetail",
  },
  age: { type: Number, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  surname: { type: String, required: true },
});

const AttractionPaxDetail = mongoose.model(
  "AttractionPaxDetail",
  AttractionPaxDetailSchema
);

module.exports = AttractionPaxDetail;
