const BannerService = require("../services/BannerService");
const BookingRequestService = require("../services/BookingRequestService");

class BookingRequestController {
  async create(req, res) {
    try {
      const response = await BookingRequestService.create(req.body);
      res.status(201).json({ message: "New Review created", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getList(req, res) {
    // try {
    const response = await BookingRequestService.list(req.body);
    res.status(200).json({ message: "", data: response });
    // } catch (_) {
    //   res.status(500).json({ error: "Internal server error" });
    // }
  }
}

module.exports = new BookingRequestController();
