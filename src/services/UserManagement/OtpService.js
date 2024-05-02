// const SMSClient = require('./SMSClient'); // Import your SMS client module
const UserOTP = require('../../models/UserManagement/UserOTP'); // Import your UserOTP model

class OTPService {
  constructor() {
    // No need for otpMap, as OTPs will be saved in the database
  }

  async generateAndSendOTP(userId, phoneNumber) {
    const otp = this.generateOTP();
    await this.saveOTP(userId, otp);
    
    // Send the OTP via SMS
    const message = `Your OTP for password reset is: ${otp}`;
   // SMSClient.sendSMS(phoneNumber, message); // Implement the SMS sending logic
  }

  generateOTP() {
    // Generate a random 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async saveOTP(userId, otp) {
    // Save the OTP in the database
    await UserOTP.create({ user_id: userId, otp });
  }

  async verifyOTP(userId, otp) {
    // Retrieve the OTP associated with the user's user_id from the database
    const userOTP = await UserOTP.findOne({ user_id: userId }).sort({ createdAt: -1 });

    // Verify if the provided OTP matches the saved OTP associated with the user's user_id
    return userOTP && userOTP.otp === otp;
  }

  async removeOTP(userId) {
    // Remove the OTP associated with the user's user_id from the database
    await UserOTP.deleteOne({ user_id: userId });
  }
}

module.exports = new OTPService();
