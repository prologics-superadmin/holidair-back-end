require("dotenv").config();
const db = require("../src/configs/db");
const fs = require("fs");
const csv = require("csv-parser");
const Country = require("../src/models/Country");
const { readCSV } = require("../src/helpers/readCsvAndReturnArray");

async function automateCountrys() {
  console.log("\x1b[34m", "[country script] Automating country. It may take a while.");
  try {
    console.log("\x1b[32m", "[country script] Clearing the database.");

    let countrysObj = await Country.findOne();

    if (countrysObj) {
      console.log("\x1b[35m", "[countrys script] Already have");
    } else {
      const filePath = "uploads/csv/country.csv";
      let out = await readCSV(filePath, 0);

      let formattedArray = [];

      for (let obj of out) {
        formattedArray.push({
          name: obj.CountryName,
          code: obj.CountryId,
        });
      }
      await Country.create(formattedArray);
    }

    console.log("\x1b[32m", "[country script] country Automated Successfully.");

  } catch (_) {
    console.log("\x1b[31m", "[country script] Error while automating country.");
    console.log(_);
    process.exit(1);
  }
}

module.exports = automateCountrys;
