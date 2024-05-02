// UserOTP.js

const mongoose = require('mongoose');

const userOTPSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const UserOTP = mongoose.model('UserOTP', userOTPSchema);

module.exports = UserOTP;
