const mongoose = require("mongoose");

const CallMeRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    callDate: {
      type: Date,
      required: true,
    },
    callTimeFrom: {
      type: String,
      required: true,
    },
    callTimeTo: {
      type: String,
      required: true,
    },
    enquiryType: {
      type: String,
      required: true,
      enum: [
        "general",
        "flight",
        "hotel",
        "package",
        "website",
        "transaction",
        "others",
      ], // List of allowed enquiry types
    },
    enquiryDescription: {
      type: String,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const CallMeRequest = mongoose.model("CallMeRequest", CallMeRequestSchema);

module.exports = CallMeRequest;
