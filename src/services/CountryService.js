const { query } = require("express");
const Country = require("../models/Country");
const City = require("../models/City");
const Airport = require("../models/Airport");
const Airline = require("../models/Airline");
const Location = require("../models/Location");

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

  async getAirportList(data) {
    try {
      const search = data.search;
      const filters = data.filters || {};

      const query = { ...filters };

      if (search) {
        query["$or"] = [
          { name: { $regex: search, $options: "i" } },
          { city: { $regex: search, $options: "i" } },
          { state: { $regex: search, $options: "i" } },
          { country: { $regex: search, $options: "i" } },
          { code: { $regex: search, $options: "i" } },
        ];
      }

      const result = await Airport.find(query).limit(100);
      return result.map((airPort) => ({
        _id: airPort._id,
        name: airPort.name,
      }));
    } catch (error) {
      throw error;
    }
  }

  async getAirlineList(data) {
    try {
      const search = data.search;
      const filters = data.filters || {};

      const query = { ...filters };

      if (search) {
        query["$or"] = [
          { code: { $regex: search, $options: "i" } },
          { name: { $regex: search, $options: "i" } },
        ];
      }

      const result = await Airline.find(query);
      return result.map((airLine) => ({
        _id: airLine._id,
        name: `${airLine.name} (${airLine.code})`,
      }));
    } catch (error) {
      throw error;
    }
  }

  async getAirports(data) {
    try {
      const search = data.text;
      const filters = data.filters || {};

      const query = { ...filters };

      if (search) {
        query["$or"] = [
          { name: { $regex: search, $options: "i" } },
          { city: { $regex: search, $options: "i" } },
          { state: { $regex: search, $options: "i" } },
          { country: { $regex: search, $options: "i" } },
          { code: { $regex: search, $options: "i" } },
        ];
      }

      const result = await Airport.find(query).limit(100);
      return result.map((airPort) => ({
        code: airPort.code,
        name: `${airPort.name} - ${airPort.country}`,
      }));
    } catch (error) {
      throw error;
    }
  }

  async getAirLines(data) {
    try {
      const search = data.text;
      const filters = data.filters || {};

      const query = { ...filters };

      if (search) {
        query["$or"] = [
          { code: { $regex: search, $options: "i" } },
          { name: { $regex: search, $options: "i" } },
        ];
      }

      const result = await Airline.find(query);
      return result.map((airLine) => ({
        code: airLine.code,
        name: `${airLine.name} (${airLine.code})`,
      }));
    } catch (error) {
      throw error;
    }
  }

  async getCountry(data) {
    try {
      const search = data.text;
      const filters = data.filters || {};

      const query = { ...filters };

      if (search) {
        query["$or"] = [
          { code: { $regex: search, $options: "i" } },
          { name: { $regex: search, $options: "i" } },
        ];
      }

      const result = await Country.find(query);
      return result.map((airLine) => ({
        code: airLine.code,
        name: `${airLine.name} (${airLine.code})`,
      }));
    } catch (error) {
      throw error;
    }
  }

  async getLocation(data) {
    try {
      const search = data.text;
      const filters = data.filters || {};

      const query = { ...filters };

      if (search) {
        query["$or"] = [
          { code: { $regex: search, $options: "i" } },
          { name: { $regex: search, $options: "i" } },
        ];
      }

      const result = await Location.find(query);
      return result.map((location) => ({
        code: location.location,
        name: `${location.name} (${location.location} - ${location.country_name})`,
      }));
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CountryService();
