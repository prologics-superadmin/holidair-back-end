const { query } = require("express");
const Country = require("../models/Country");
const City = require("../models/City");

class CountryService {
  async getList(data) {
    try {
      const search = data.search;
      const query = {};
      if (search) {
        query["$or"] = [{ name: { $regex: search, $options: "i" } }];
      }
      const result = await Country.find(query);
      return result.map((country) => ({
        value: country._id,
        label: country.name,
      }));
    } catch (error) {
      throw error;
    }
  }

  async getCityList(data) {
    try {
      const search = data.search;
      const filters = data.filters || {};

      const query = { ...filters };

      if (search) {
        query["$or"] = [
          { country: { $regex: search, $options: "i" } },
          { name: { $regex: search, $options: "i" } },
        ];
      }
      const result = await City.find(query);
      return result.map((city) => ({
        value: city._id,
        label: city.name,
      }));
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CountryService();
