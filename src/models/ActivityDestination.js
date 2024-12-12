const { default: mongoose } = require("mongoose");

const ActivityDestinationsSchema = new mongoose.Schema({
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

const ActivityDestination = mongoose.model(
  "ActivityDestination",
  ActivityDestinationsSchema
);

module.exports = ActivityDestination;
