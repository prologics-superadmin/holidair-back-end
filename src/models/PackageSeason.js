const mongoose = require("mongoose");

const PackageSeasonSchema = new mongoose.Schema({
  package_id: {
    type: String,
  },
  from_date: {
    type: String,
  },
  to_date: {
    type: String,
  },
  currency_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Currency",
  },
  price: {
    type: String,
  },
});

const PackageSeason = mongoose.model("PackageSeason", PackageSeasonSchema);

module.exports = PackageSeason;
