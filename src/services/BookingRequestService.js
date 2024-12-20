const BookingRequest = require("../models/BookingRequest");
const CallMeRequest = require("../models/CallMeRequest");

class BookingRequestService {
  async create(data) {
    try {
      return await BookingRequest.create(data);
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

      const result = await BookingRequest.find(query).populate({
        path: "plan_id",
        select: "package_name _id",
      });
      const count = await BookingRequest.countDocuments(query);

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
          data: result.map((data) => ({
            _id: data._id, // Extracting the unique ID of the booking request
            name: data.full_name, // Using 'full_name' from the BookingRequest schema
            contact_no: data.contact_number, // Using 'contact_number' from the BookingRequest schema
            email: data.email, // Adding the email for clarity
            country: data.country, // Country field from the schema
            check_in_date: new Date(data.check_in_date)
              .toISOString()
              .split("T")[0], // Format check-in date to YYYY-MM-DD
            check_out_date: new Date(data.check_out_date)
              .toISOString()
              .split("T")[0], // Format check-out date to YYYY-MM-DD
            plan_id: data.plan_id?._id || null, // Including plan ID, if available
            plan_name: data.plan_id?.package_name || null, // Including plan name, if available
          })),
          dataCount: count, // Total count of data
          dataPerPage: itemsPerPage, // Number of items per page
          currentPaginationIndex: 1, // Current page index, default to 1
          message: "Data Returned.", // Response message
        };
        return response;
      }
    } catch (error) {
      throw error;
    }
  }

  async contactMeCreate(data) {
    try {
      return await CallMeRequest.create(data);
    } catch (error) {
      throw error;
    }
  }

  async callMeList(data) {
    try {
      const page = parseInt(data.currentPageIndex) || 1;
      const filters = data.filters || {};
      const search = data.search;
      const itemsPerPage = data.dataPerPage || 20;
      const skip = (page - 1) * itemsPerPage;

      const query = { ...filters };

      // Add search logic if a search term is provided
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } }, // Search by name (case-insensitive)
          { phone: { $regex: search, $options: "i" } }, // Search by phone
          { email: { $regex: search, $options: "i" } }, // Search by email
        ];
      }

      const result = await CallMeRequest.find(query)
        .skip(skip)
        .limit(itemsPerPage)
        .sort({ createdAt: -1 }); // Sort by most recent first
      const count = await CallMeRequest.countDocuments(query);

      let response = {};

      if (count <= 0) {
        response = {
          data: [],
          dataCount: 0,
          currentPaginationIndex: page,
          dataPerPage: itemsPerPage,
          message: "No matching records found.",
        };
      } else {
        response = {
          data: result.map((data) => ({
            _id: data._id, // Unique ID of the request
            name: data.name, // Name of the requester
            phone: data.phone, // Phone number
            email: data.email, // Email address
            callDate: data.callDate.toISOString().split("T")[0], // Format date to YYYY-MM-DD

            enquiryType: data.enquiryType, // Enquiry type
            enquiryDescription: data.enquiryDescription, // Enquiry description
            createdAt: data.createdAt, // Creation timestamp
          })),
          dataCount: count, // Total count of matching records
          dataPerPage: itemsPerPage, // Items per page
          currentPaginationIndex: page, // Current page index
          message: "Data returned successfully.", // Response message
        };
      }

      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new BookingRequestService();
