const mongoose = require("mongoose");

const FlightOfferSchema = new mongoose.Schema(
  {
    destination_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
    },
    from_location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Airport",
    },
    to_location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Airport",
    },
    price: {
      type: String,
    },
    airline_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Airline",
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
