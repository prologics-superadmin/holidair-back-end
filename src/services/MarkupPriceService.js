const { valid } = require("joi");
const MarkupPrice = require("../models/MarkupPrice");

class MarkupPriceService {
  async create(data) {
    try {
      return MarkupPrice.create(data);
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      return MarkupPrice.findByIdAndUpdate(id, data);
    } catch (error) {
      throw error;
    }
  }

  async getPrice(data) {
    try {
      const query = { name: data };
      return MarkupPrice.findOne(query);
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
    try {
      const query = { is_deleted: false, ...filters };

      const result = await MarkupPrice.find(query);

      const count = await MarkupPrice.countDocuments(query);

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
          data: result.map((price) => ({
            _id: price._id,
            name: price.name,
            price: price.price,
          })),
          dataCount: count,
          dataPerPage: itemsPerPage,
          currentPaginationIndex: 1, // Assuming this should be 1 for the first page
          message: "Data Returned.",
        };
      }
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new MarkupPriceService();
