const mongoose = require("mongoose");

const MarkupSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    markup_type: {
      type: String,
      required: true,
    },
    rule_type: {
      type: String,
      required: true,
    },
    rule_name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    amount_type: {
      type: String,
      required: true,
    },
    booking_type: {
      type: String,
      required: true,
    },
    charging_from: {
      type: String,
      required: true,
    },
    journey_type: {
      type: String,
      required: true,
    },
    fare_type: {
      type: String,
      required: true,
    },
    class_type: {
      type: String,
      required: true,
    },
    stops_over: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Markup = mongoose.model("Markup", MarkupSchema);

module.exports = Markup;
