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
      type: String, // Assuming storing image URL
    },
  },
  { timestamps: true }
);

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
