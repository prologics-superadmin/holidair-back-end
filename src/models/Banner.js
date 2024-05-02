const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
  {
    text_one: {
      type: String,
      required: true,
    },
    text_two: {
      type: String,
      required: true,
    },
    banner_url: {
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

const Banner = mongoose.model("Banner", BannerSchema);

module.exports = Banner;
