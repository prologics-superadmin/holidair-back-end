const { default: mongoose } = require("mongoose");

const HotelDestinationsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  code: {
    type: String,
  },
  country_code: {
    type: String,
  },
  country: {
    type: String,
  },
});

const HotelDestination = mongoose.model(
  "HotelDestination",
  HotelDestinationsSchema
);

module.exports = HotelDestination;
