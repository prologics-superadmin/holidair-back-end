const mongoose = require("mongoose");

const UserRoleSchema = new mongoose.Schema(
  {
    ID: { type: Number, required: true, default: 0 },
    role: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("UserRole", UserRoleSchema);
