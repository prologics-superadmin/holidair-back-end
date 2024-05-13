const { number } = require("joi");
const mongoose = require("mongoose");

const AirlineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Airline = mongoose.model("Airline", AirlineSchema);

module.exports = Airline;