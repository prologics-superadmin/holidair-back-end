const holidayairBookingDetails = require("../mail/holidayair-booking-details");
const holidayairContactusRequest = require("../mail/holidayair-contactus-request");
const sendMail = require("../mail/mail");
const BannerService = require("../services/BannerService");
const BookingRequestService = require("../services/BookingRequestService");
const MarkupService = require("../services/MarkupService");

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
    try {
      const response = await BookingRequestService.list(req.body);
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async markupList(req, res) {
    try {
      // console.log("ss");
      const response = await MarkupService.list(req.body);
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async contactUs(req, res) {
    try {
      await sendMail(
        "nayanadarshana1@gmail.com",
        "Contact us request",
        holidayairContactusRequest({
          titel: "Contact",
          booking_id: "N/A",
          penair_id: "N/A",
          passenger_name: req.body.name,
          contact_number: req.body.phone,
          email: req.body.phone,
          from: "N/A",
          to: "N/A",
          message: req.body.message,
          departuredate: "N/A",
          arrivaldate: "N/A",
        })
      );
      res.status(201).json({ message: "", data: "" });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new BookingRequestController();
