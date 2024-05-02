const ReviewService = require("../services/ReviewService");

class ReviewController {
  async create(req, res) {
    try {
      const response = ReviewService.create(data);
      res.status(201).json({ message: "New Review created", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req, res) {
    try {
      await ReviewService.update(req.params.id, req.body);
      const response = await ReviewService(req.params.id);
      res.status(200).json({ message: "Review updated", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async get(req, res) {
    try {
      const response = await ReviewService.get(req.params.id);
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAll(req, res) {
    try {
      const response = await ReviewService.getAll();
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getList() {
    try {
      const response = await ReviewService.list(req.params.body);
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req, res) {
    try {
      await ReviewService.delete(req.params.id);
      res.status(200).json({ message: "Deleted review Successfully" });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new ReviewController();
