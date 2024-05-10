const FlightOffer = require("../models/FlightOffers");

class FlightOfferService {
  async create(data) {
    try {
      return FlightOffer.create(data);
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      return await FlightOffer.findByIdAndUpdate(id, data);
    } catch (error) {
      throw error;
    }
  }

  async get(id) {
    try {
      return await FlightOffer.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const query = { is_deleted: false };
      return await FlightOffer.find(query);
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

      const result = await FlightOffer.find(query);
      const count = await FlightOffer.countDocuments(query);

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
          data: result,
          dataCount: 0,
          currentPaginationIndex: page,
          dataPerPage: 20,
          message: "There are not matching records.",
        };
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      return await FlightOffer.findByIdAndUpdate(
        id,
        { $set: { is_deleted: true } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new FlightOfferService();
