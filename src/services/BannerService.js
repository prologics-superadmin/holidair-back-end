const Banner = require("../models/Banner");

class BannerService {
  async create(data) {
    try {
      return await Banner.create(data);
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      return await Banner.findByIdAndUpdate(id, data);
    } catch (error) {
      throw error;
    }
  }

  async get(id) {
    try {
      return await Banner.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const query = { is_deleted: false };
      return await Banner.find(query);
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

      const result = await Banner.find(query);
      const count = await Banner.countDocuments(query);

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
          data: result.map((banner) => ({
            _id: banner._id,
            text_one: banner.text_one.substring(0, 3).trimEnd() + "...",
            text_two: banner.text_two.substring(0, 3).trimEnd() + "...",
            banner_url: banner.banner_url,
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

  async delete(id) {
    try {
      return await Banner.findByIdAndUpdate(
        id,
        { $set: { is_deleted: true } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async imageUpload(bannerId, imageUrl) {
    try {
      return await Banner.findByIdAndUpdate(
        bannerId,
        { banner_url: imageUrl },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async getBannerList() {
    try {
      const query = { is_deleted: false };
      const result = await Banner.find(query);
      return result.map((banner) => ({
        id: banner._id,
        imageSrc: banner.banner_url,
        subtitle: banner.text_two,
        title: banner.text_one,
      }));
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new BannerService();
