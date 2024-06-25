const UserProfileService = require("../../services/UserProfileService");

class UserProfileController {
  async getBookingDetails(req, res) {
    try {
      const response = await UserProfileService.getBookingData(req.user.userId);
      res.status(200).json({ data: response });
    } catch (error) {
      console.error("Error creating pax detail:", error);
      throw error;
    }
  }
}

module.exports = new UserProfileController();
