const Markup = require("../models/Markup");

class MarkupService {
  async createMarkup(data) {
    try {
      return await Markup.create(data);
    } catch (error) {
      throw error;
    }
  }

  async updateMarkup(id, data) {
    try {
      return await Markup.findByIdAndUpdate(id, data);
    } catch (error) {
      throw error;
    }
  }

  async getMarkupByType(type) {
    try {
      return await Markup.findOne({ type });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new MarkupService();
