const BookingRequest = require("../models/BookingRequest");

class BookingRequestService {
  async create(data) {
    try {
      return await BookingRequest.create(data);
    } catch (error) {
      throw error;
    }
  }

  async list(data) {
    // try {
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
    // } catch (error) {
    //   throw error;
    // }
  }
}

module.exports = new BookingRequestService();
