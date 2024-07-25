const { required } = require("joi");
const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema(
  {
    country: {
      type: String,
    },
    location: {
      type: String,
    },
    name: {
      type: String,
    },
    country_name: {
      type: String,
    },
  },
  { timestamps: true }
);

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
