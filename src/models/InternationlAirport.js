const mongoose = require("mongoose");

const InternationalAirportSchema = new mongoose.Schema({
  name: String,
  city: String,
  country: String,
  iata: String,
  icao: String,
  latitude: Number,
  longitude: Number,
  altitude: Number,
  timezone: String,
  dst: String,
  tzDatabase: String,
  type: String,
  source: String,
});

const InternationalAirport = mongoose.model(
  "InternationalAirport",
  InternationalAirportSchema
);

module.exports = InternationalAirport;
