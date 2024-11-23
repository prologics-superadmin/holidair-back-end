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

  async getMarkupById(id) {
    try {
      return await Markup.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async list(data) {
    const page = parseInt(data.currentPageIndex) || 1;
    const filters = data.filters || {};
    const search = data.search;
    const itemsPerPage = data.dataPerPage;
    const skip = (page - 1) * itemsPerPage;

    // try {
    const query = { ...filters };
    const result = await Markup.find(query);
    const count = await Markup.countDocuments(query);
    let response = {};

    if (count <= 0) {
      response = {
        data: [],
        dataCount: 0,
        currentPaginationIndex: page,
        dataPerPage: 20,
        message: "There are not matching records.",
      };
    } else {
      response = {
        data: result.map((res) => ({
          _id: res._id,
          type: res.type,
          markup_type: res.markup_type,
          rule_type: res.rule_type,
          rule_name: res.rule_name,
          amount: res.amount,
          amount_type: res.amount_type,
          booking_type: res.booking_type,
          charging_from: res.charging_from,
          journey_type: res.journey_type,
          fare_type: res.fare_type,
          class_type: res.class_type,
          stops_over: res.stops_over,
          createdAt: res.createdAt,
          updatedAt: res.updatedAt,
        })),
      };
    }
    return response;
    // } catch (error) {
    //   throw error;
    // }
  }
}

module.exports = new MarkupService();
