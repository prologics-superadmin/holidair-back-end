const HotelBookingDetail = require("../models/HotelBooking/BookingDetail");
const BookingDetails = require("../models/flightBooking/BookingDetails");

// Helper function to generate random digits
function getRandomDigits(length) {
  let digits = "";
  for (let i = 0; i < length; i++) {
    digits += Math.floor(Math.random() * 10).toString();
  }
  return digits;
}

// Helper function to generate unique booking ID
async function generateBookingID(prefix) {
  let bookingID;
  let exists = true;

  while (exists) {
    const randomLength = Math.floor(Math.random() * (12 - 8 + 1)) + 8;
    bookingID = `${prefix}${getRandomDigits(randomLength)}`;

    if (prefix === "FL") {
      exists = await BookingDetails.exists({ booking_id: bookingID });
    } else {
      exists = await HotelBookingDetail.exists({ booking_id: bookingID });
    }
  }

  return bookingID;
}

module.exports = generateBookingID;
