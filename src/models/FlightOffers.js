const mongoose = require("mongoose");

const FlightOfferSchema = new mongoose.Schema(
  {
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
    },
    from_location: {
      type: String,
    },
    to_location: {
      type: String,
    },
    price: {
      type: String,
    },
    airline_code: {
      type: String,
    },
    airline_baggage: {
      type: String,
    },
    flight_offer: {
      type: Boolean,
    },
    worldwide_flight_offer: {
      type: Boolean,
    },
    is_deleted: {
      type: Boolean,
      default: 0,
    },
  },
  { timestamps: true }
);

const FlightOffer = mongoose.model("FlightOffer", FlightOfferSchema);

module.exports = FlightOffer;
