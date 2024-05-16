require("dotenv").config();
const db = require("../src/configs/db");
const fs = require("fs");

const Airports = require("../uploads/json/airports.json");
const Airport = require("../src/models/Airport");

async function automateAirports() {
  console.log(
    "\x1b[34m",
    "[Airport script] Automating Airport. It may take a while."
  );
  try {
    console.log("\x1b[32m", "[Airport script] Clearing the database.");

    let AirportsObj = await Airport.findOne();

    if (AirportsObj) {
      console.log("\x1b[35m", "[Airports script] Already have");
    } else {
      await Airport.create(Airports);
    }

    console.log("\x1b[32m", "[Airport script] Airport Automated Successfully.");

  } catch (_) {
    console.log("\x1b[31m", "[Airport script] Error while automating Airport.");
    console.log(_);
    process.exit(1);
  }
}

module.exports = automateAirports;
