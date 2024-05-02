const DestinationService = require("../services/DestinationService");

class DestinationController {
  async create(req, res) {
    try {
      const response = await DestinationService.create(req.body);
      res
        .status(201)
        .json({ message: "New Destination created", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async update(req, res) {
    try {
      await DestinationService.update(req.params.id, req.body);
      const response = await DestinationService.get(req.params.id);
      res
        .status(200)
        .json({ message: "New Destination Updated", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async get(req, res) {
    try {
      const response = await DestinationService.get(req.params.id);
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAll(req, res) {
    try {
      const response = await DestinationService.getAll();
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getList(req, res) {
    try {
      const response = await DestinationService.list(req.params.body);
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req, res) {
    try {
      await DestinationService.delete(req.params.id);
      res.status(200).json({ message: "Deleted destination Successfully" });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new DestinationController();
