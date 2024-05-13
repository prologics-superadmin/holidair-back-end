const FlightOfferService = require("../services/FlightOfferService");

class FlightOfferController {
  async create(req, res) {
    try {
      const response = await FlightOfferService.create(req.body);
      res
        .status(201)
        .json({ message: "New  Flight Offer created", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req, res) {
    try {
      await FlightOfferService.update(req.params.id, req.body);
      const response = await FlightOfferService.get(req.params.id);
      res
        .status(200)
        .json({ message: "New Flight Offer Updated", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async get(req, res) {
    try {
      const response = await FlightOfferService.get(req.params.id);
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAll(req, res) {
    try {
      const response = await FlightOfferService.getAll();
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getList(req, res) {
    try {
      const response = await FlightOfferService.list(req.body);
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req, res) {
    try {
      await FlightOfferService.delete(req.params.id);
      res.status(200).json({ message: "Deleted Flight Offer Successfully" });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAllList(req, res) {
    try {
      const response = await FlightOfferService.getAllList(req.params.type);
      res.status(201).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new FlightOfferController();
