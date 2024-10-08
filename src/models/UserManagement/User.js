const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  // code: {
  //   type: String,
  //   unique: true,
  // },
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: false,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
  },
  nic: {
    type: String,
  },
  dob: {
    type: Date,
  },
  user_role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserRole",
  },
  // shop_name: String,
  // area: String,
  // status: {
  //   type: Boolean,
  // },
  // mapping: {
  //   type: String,
  //   default: null,
  // },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  // assign_territory: {
  //   // UUID locationHirachy
  //   type: [String],
  //   default: "",
  // },
  // assign_warehouse: {
  //   // UUID locationHirachy
  //   type: [String],
  //   default: "",
  // },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const jwtSecretKey = process.env.JWT_SECRET_KEY;

userSchema.methods.generateAuthToken = function (role_id) {
  const token = jwt.sign({ userId: this._id, role: role_id }, jwtSecretKey, {
    expiresIn: "1d",
  });
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    user_name: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    address: Joi.string(),
    phone: Joi.string(),
    gender: Joi.string(),
    dob: Joi.string(),
    nic: Joi.string(),
    // user_role_id: Joi.string().required(),
    // phone_number: Joi.number().required(),
    // shop_name: Joi.string(),
    // area: Joi.string(),
    // mapping: Joi.string(),
    // code: Joi.string(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
