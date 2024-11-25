const Package = require("../models/Package");
const formatCurrency = require("../utils/formatCurrency");

class PackageService {
  async create(data) {
    try {
      return await Package.create(data);
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      return await Package.findByIdAndUpdate(id, data);
    } catch (error) {
      throw error;
    }
  }

  async get(id) {
    try {
      return await Package.findById(id)
        .populate({
          path: "city_id",
          select: "name _id", // Select only name field of the brand object
        })
        .populate({
          path: "country_id",
          select: "name _id", // Select only name field of the brand object
        });
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const query = { is_deleted: false };
      return await Package.find(query);
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

      const result = await Package.find(query).populate({
        path: "city_id",
        select: "name", // Select only name field of the brand object
      });
      const count = await Package.countDocuments(query);

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
          data: result.map((pack) => ({
            _id: pack._id,
            package_name: pack.package_name,
            city_name: pack.city_id?.name,
            currency: pack.currency,
            price: formatCurrency(pack.price),
            duration: parseInt(pack.duration),

            min_pax: pack.min_pax ? parseInt(pack.min_pax) : "",
            max_pax: pack.max_pax ? parseInt(pack.max_pax) : "",
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
      return await Package.findByIdAndUpdate(
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
      return await Package.findByIdAndUpdate(
        bannerId,
        { image_url: imageUrl },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async getHolidayOffers() {
    try {
      const query = { is_deleted: false, holiday_offers: true };
      const result = await Package.find(query).populate({
        path: "city_id",
        select: "name", // Select only name field of the brand object
      });
      const response = result.map((data) => ({
        title: data.title,
        _id: data._id,
        imageSrc: data.image_url,
        rating: data.star_rating.length - 1,
        price: formatCurrency(data.price),
        days: data.duration,
        location: data.city,
      }));
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getHotelPackages() {
    try {
      const query = { is_deleted: false, hotels: true };
      const result = await Package.find(query).populate({
        path: "city_id",
        select: "name", // Select only name field of the brand object
      });
      const response = result.map((data) => ({
        title: data.title,
        _id: data._id,
        imageSrc: data.image_url,
        rating: data.star_rating.length - 1,
        price: formatCurrency(data.price),
        days: data.duration,
        location: data.city,
      }));
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getHotDeals() {
    try {
      const query = { is_deleted: false, hot_deals: true };
      const result = await Package.find(query).populate({
        path: "city_id",
        select: "name", // Select only name field of the brand object
      });
      const response = result.map((data) => ({
        title: data.title,
        _id: data._id,
        imageSrc: data.image_url,
        rating: data.star_rating.length - 1,
        price: formatCurrency(data.price),
        days: data.duration,
        location: data.city,
      }));
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getHolidayPackage() {
    try {
      const query = { is_deleted: false, holiday_packages: true };
      const result = await Package.find(query).populate({
        path: "city_id",
        select: "name", // Select only name field of the brand object
      });
      const response = result.map((data) => ({
        title: data.title,
        _id: data._id,
        imageSrc: data.image_url,
        rating: data.star_rating.length - 1,
        price: formatCurrency(data.price),
        days: data.duration,
        location: data.city,
      }));
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PackageService();
