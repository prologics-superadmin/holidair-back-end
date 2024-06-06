const mongoose = require("mongoose");

const AttractionBookingDetailSchema = new mongoose.Schema(
  {
    preferred_language: { type: String, required: true },
    service_language: { type: String, required: true },
    rate_key: { type: String, required: true },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    zip_code: { type: String, required: true },
    mailing: { type: Boolean, required: true },
    mailUpdDate: { type: Date, required: true },
    country: { type: String, required: true },
    surname: { type: String, required: true },
    telephones: { type: [Number], required: true },
  },
  { timestamps: true }
);

const AttractionBookingDetail = mongoose.model(
  "AttractionBookingDetail",
  AttractionBookingDetailSchema
);

module.exports = AttractionBookingDetail;
