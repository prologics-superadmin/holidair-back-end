const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema(
  {
    country_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
    city_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    currency: {
      type: String,
    },
    price: {
      type: String,
    },
    package_name: {
      type: String,
    },
    star_rating: {
      type: String,
    },
    duration: {
      type: String,
    },
    on_home: {
      type: Boolean,
      default: false,
    },
    holiday_offers: {
      type: Boolean,
      default: false,
    },
    hot_deals: {
      type: Boolean,
      default: false,
    },
    holiday_packages: {
      type: Boolean,
      default: false,
    },
    hotels: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Boolean,
      default: false,
    },
    discount_value: {
      type: String,
    },
    accommodation: {
      type: Boolean,
      default: false,
    },
    flights: {
      type: Boolean,
      default: false,
    },
    meals: {
      type: Boolean,
      default: false,
    },
    transportation: {
      type: Boolean,
      default: false,
    },
    sightseen: {
      type: Boolean,
      default: false,
    },
    min_pax: {
      type: String,
    },
    max_pax: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    from_date: {
      type: String,
    },
    to_date: {
      type: String,
    },
    season_currency: {
      type: String,
    },
    season_price: {
      type: String,
    },
    seo_title: {
      type: String,
    },
    seo_keywords: {
      type: String,
    },
    image_url: {
      type: String,
      default: null,
    },
    seo_description: {
      type: String,
    },
    is_deleted: {
      type: Boolean,
      default: 0,
    },
    city: {
      type: String,
    },
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", PackageSchema);

module.exports = Package;
