const mongoose = require("mongoose");
const axios = require("axios");
const crypto = require("crypto");
const Country = require("../src/models/Country");
const ActivityDestination = require("../src/models/ActivityDestination");

const database = process.env.DBNAME;
const mongoURI = "mongodb://127.0.0.1:27017/" + database;

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
}

async function fetchDestinationsByCountry() {
  try {
    const countries = await Country.find();
    console.log("Fetched destinations:", countries);
    const dest = await ActivityDestination.find();
    console.log("Fetched destinations:", dest);
  } catch (error) {
    console.error(
      "An error occurred while fetching destinations:",
      error.message
    );
  }
}

async function main() {
  await connectToDatabase();
  await fetchDestinationsByCountry();
  mongoose.disconnect(); // Optional, disconnect after operation
}

main();
