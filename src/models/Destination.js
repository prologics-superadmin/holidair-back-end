const { required } = require("joi");
const mongoose = require("mongoose");

const DestinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image_url: {
      type: String, // Assuming storing image URL
      default: null,
    },
    is_deleted: {
      type: Boolean,
      default: 0,
    },
  },
  { timestamps: true }
);

const Destination = mongoose.model("Destination", DestinationSchema);

module.exports = Destination;
