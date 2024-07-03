const mongoose = require("mongoose");

const MarkUpPriceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    is_deleted: {
      type: Boolean,
      default: 0,
    },
  },
  { timestamps: true }
);

const MarkupPrice = mongoose.model("MarkupPrice", MarkUpPriceSchema);

module.exports = MarkupPrice;
