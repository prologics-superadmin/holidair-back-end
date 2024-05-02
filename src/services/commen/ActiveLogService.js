const ActiveLog = require('../../models/commen/ActiveLog');

class ActiveLogService {
  async createActiveLog(data) {
    try {
      return await ActiveLog.create(data);
    } catch (error) {
      throw error;
    }
  }

  async updateActiveLog(id, data) {
    try {
      return await ActiveLog.findByIdAndUpdate(id, data);
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      return await ActiveLog.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      return await ActiveLog.find();
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
      const query = filters;

      if (search) {
        query["$or"] = [
          { user: { $regex: search, $options: "i" } },
          { function_name: { $regex: search, $options: "i" } },
          { UUID: { $regex: search, $options: "i" } },
          { device: { $regex: search, $options: "i" } },
          { ip_address: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
          { browser: { $regex: search, $options: "i" } },
          { os: { $regex: search, $options: "i" } },
          { doc_ids: { $regex: search, $options: "i" } },
        ];
      }

      const result = await ActiveLog.find(query)
        .skip(skip)
        .limit(itemsPerPage)
        .sort({ createdAt: -1 });
      const count = await ActiveLog.countDocuments(query);

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
          dataCount: count,
          currentPaginationIndex: page,
          dataPerPage: itemsPerPage,
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
      return await ActiveLog.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ActiveLogService();
