const BookingDetails = require("../models/flightBooking/BookingDetails");

// Helper function to generate random digits
function getRandomDigits(length) {
  let digits = "";
  for (let i = 0; i < length; i++) {
    digits += Math.floor(Math.random() * 10).toString();
  }
  return digits;
}

// Helper function to generate unique transaction ID
async function transactionIdGenerator(prefix = "TR") {
  let transactionID;
  let exists = true;

  while (exists) {
    const randomLength = Math.floor(Math.random() * (12 - 8 + 1)) + 8; // Generate random length between 8 and 12 digits
    transactionID = `${prefix}${getRandomDigits(randomLength)}`;

    exists = await BookingDetails.exists({ transaction_id: transactionID });
  }

  return transactionID;
}

module.exports = transactionIdGenerator;
