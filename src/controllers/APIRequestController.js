const ApiRequestLogService = require("../services/ApiRequestLogService");

class APIRequestController {
  async getList(req, res) {
    try {
      const response = await ApiRequestLogService.getAll(req.body);
      res.status(200).json({ message: "", data: response });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async getById(req, res) {
    try {
      const response = await ApiRequestLogService.getById(req.params.id);
      res.status(200).json({ message: "", data: response });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

module.exports = new APIRequestController();
