const { findOneAndDelete } = require("../models/Banner");
const FlightOffer = require("../models/FlightOffers");
const formatCurrency = require("../utils/formatCurrency");

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
      return await FlightOffer.findById(id)
        .populate({
          path: "destination_id",
          select: "name _id image_url", // Select only name field of the brand object
        })
        .populate({
          path: "to_location",
          select: "name _id", // Select only name field of the brand object
        })
        .populate({
          path: "from_location",
          select: "name _id", // Select only name field of the brand object
        })
        .populate({
          path: "airline_id",
          select: "name _id", // Select only name field of the brand object
        });
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

      const result = await FlightOffer.find(query)
        .populate({
          path: "destination_id",
          select: "name _id", // Select only name field of the brand object
        })
        .populate({
          path: "to_location",
          select: "name _id", // Select only name field of the brand object
        })
        .populate({
          path: "from_location",
          select: "name _id", // Select only name field of the brand object
        })
        .populate({
          path: "airline_id",
          select: "name _id", // Select only name field of the brand object
        });
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
          data: result.map((offers) => ({
            _id: offers._id,
            destination_name: offers.destination_id.name,
            airline_id: offers.airline_id.name,
            from: offers.from_location.name,
            to: offers.to_location.name,
            start_date: offers.start_date,
            end_date: offers.end_date,
            price: formatCurrency(offers.price),
            reign: offers.reign,
          })),
          dataCount: result.length,
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

  async getAllList(type) {
    try {
      const currentDate = new Date();
      if (type == 1) {
        const query = {
          is_deleted: false,
          worldwide_flight_offer: true,
          end_date: { $gt: currentDate },
        };
        const result = await FlightOffer.find(query)
          .sort({ _id: -1 }) // Sort in descending order based on _id to get the latest entries first
          .limit(4)
          .populate({
            path: "destination_id",
            select: "name _id image_url", // Select only name field of the brand object
          })
          .populate({
            path: "to_location",
            select: "name _id", // Select only name field of the brand object
          })
          .populate({
            path: "from_location",
            select: "name _id", // Select only name field of the brand object
          })
          .populate({
            path: "airline_id",
            select: "name _id logo", // Select only name field of the brand object
          });
        return result.map((offer) => ({
          id: offer._id,
          name: offer.destination_id.name,
          image: offer.destination_id.image_url,
          airline_logo: offer.airline_id.logo,
          from: offer.from_location.name,
          to: offer.to_location.name,
          start_date: offer.start_date,
          end_date: offer.end_date,
          price: formatCurrency(offer.price),
          reign: offer.reign,
        }));
      } else {
        const query = {
          is_deleted: false,
          flight_offer: true,
          end_date: { $gt: currentDate },
        };
        const result = await FlightOffer.find(query)
          .populate({
            path: "destination_id",
            select: "name _id image_url", // Select only name field of the brand object
          })
          .populate({
            path: "to_location",
            select: "name _id", // Select only name field of the brand object
          })
          .populate({
            path: "from_location",
            select: "name _id", // Select only name field of the brand object
          })
          .populate({
            path: "airline_id",
            select: "name _id logo", // Select only name field of the brand object
          });
        return result.map((offer) => ({
          id: offer._id,
          name: offer.destination_id.name,
          image: offer.destination_id.image_url,
          airline_logo: offer.airline_id.logo,
          start_date: offer.start_date,
          end_date: offer.end_date,
          price: formatCurrency(offer.price),
          reign: offer.reign,
        }));
      }
    } catch (error) {
      throw error;
    }
  }

  async getFlightList(type) {
    const currentDate = new Date();
    // try {
    const query = {
      is_deleted: false,
      flight_offer: true,
      end_date: { $gt: currentDate },
      reign: type,
    };
    const result = await FlightOffer.find(query)
      .populate({
        path: "destination_id",
        select: "name _id image_url", // Select only name field of the brand object
      })
      .populate({
        path: "to_location",
        select: "name _id", // Select only name field of the brand object
      })
      .populate({
        path: "from_location",
        select: "name _id", // Select only name field of the brand object
      })
      .populate({
        path: "airline_id",
        select: "name _id logo", // Select only name field of the brand object
      });
    return result.map((offer) => ({
      id: offer._id,
      name: offer.destination_id.name,
      image: offer.destination_id.image_url,
      airline_logo: offer.airline_id.logo,
      start_date: offer.start_date,
      end_date: offer.end_date,
      price: formatCurrency(offer.price),
      reign: offer.reign,
    }));
    // } catch (error) {
    //   throw error;
    // }
  }
}

module.exports = new FlightOfferService();
