const Destination = require("../models/Destination");

class DestinationService {
  async create(data) {
    try {
      return await Destination.create(data);
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      return await Destination.findByIdAndUpdate(id, data);
    } catch (error) {
      throw error;
    }
  }

  async get(id) {
    try {
      return await Destination.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const query = { is_deleted: false };
      return await Destination.find(query);
    } catch (error) {
      throw error;
    }
  }

  async list(data) {
    try {
      const page = parseInt(data.currentPageIndex) || 1;
      const filters = data.filters || {};
      const search = data.search;
      const itemsPerPage = data.dataPerPage;
      const skip = (page - 1) * itemsPerPage;
      const query = { is_deleted: false, ...filters };

      if (search) {
        query["$or"] = [{ name: { $regex: search, $options: "i" } }];
      }

      const result = await Destination.find(query);
      const count = await Destination.countDocuments(query);

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
          data: result.map((destination) => ({
            _id: destination._id,
            name: destination.name,
            description: destination.description
              ? destination.description.split(" ").slice(0, 10).join(" ") +
                "..."
              : "",
            image_url: destination.image_url,
            is_deleted: destination.is_deleted,
            createdAt: destination.createdAt,
            updatedAt: destination.updatedAt,
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
      return await Destination.findByIdAndUpdate(
        id,
        { $set: { is_deleted: true } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async imageUpload(id, imageUrl) {
    try {
      return await Destination.findByIdAndUpdate(
        id,
        { image_url: imageUrl },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new DestinationService();
