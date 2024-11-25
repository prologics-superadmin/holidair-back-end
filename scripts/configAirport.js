require("dotenv").config();
const db = require("../src/configs/db");
const fs = require("fs");

const Airports = require("../uploads/json/airports1.json");
const Airport = require("../src/models/Airport");

async function automateAirports() {
  console.log(
    "\x1b[34m",
    "[Airport script] Automating Airport. It may take a while."
  );

  try {
    console.log("\x1b[32m", "[Airport script] Clearing the database.");

    // Clean the `Airport` collection

    console.log("\x1b[32m", "[Airport script] Database cleared.");

    // Transform the data to match the schema
    const airportDocuments = Object.values(Airports).map((airport) => ({
      code: airport.icao,
      name: airport.name,
      city: airport.city,
      state: airport.state,
      country: airport.country,
    }));

    console.log("\x1b[32m", "[Airport script] Inserting data into database.");

    // Insert data into the collection
    await Airport.insertMany(airportDocuments);

    console.log(
      "\x1b[32m",
      "[Airport script] Airport data automated successfully."
    );
  } catch (_) {
    console.log("\x1b[31m", "[Airport script] Error while automating Airport.");
    console.log(_);
    process.exit(1);
  }
}

module.exports = automateAirports;
