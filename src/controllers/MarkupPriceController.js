const MarkupPriceService = require("../services/MarkupPriceService");

class MarkupPriceController {
  async create(req, res) {
    try {
      const response = await MarkupPriceService.create(req.body);
      res.status(200).json({ message: "Created Successfully", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req, res) {
    try {
      const response = await MarkupPriceService.update(req.params.id, req.body);
      res.status(200).json({ message: "Updated Successfully", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async getList(req, res) {
    try {
      const response = await MarkupPriceService.list(req.body);
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new MarkupPriceController();
