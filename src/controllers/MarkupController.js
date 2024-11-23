const MarkupService = require("../services/MarkupService");

class MarkupController {
  async createMarkup(req, res) {
    try {
      const values = await MarkupService.getMarkupByType(req.body.type);
      let response = "";
      console.log(values, req.body.type);
      if (values) {
        console.log(values._id);
        response = await MarkupService.updateMarkup(values._id, req.body);
      } else {
        response = await MarkupService.createMarkup(req.body);
      }

      res.status(201).json({ message: "Markup created", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateMarkup(req, res) {
    try {
      const response = await MarkupService.updateMarkup(
        req.params.id,
        req.body
      );
      res.status(201).json({ message: "Markup updated", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getSelectedMarkup(req, res) {
    try {
      const response = await MarkupService.getMarkupById(req.params.id);
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new MarkupController();
