require("dotenv").config();
const db = require("../src/configs/db");
const fs = require("fs");
const csv = require("csv-parser");
const { getName } = require("country-list");

const { readCSV } = require("../src/helpers/readCsvAndReturnArray");
const Location = require("../src/models/Location");

async function automateDectinations() {
  console.log(
    "\x1b[34m",
    "[destination script] Automating destination. It may take a while."
  );
  try {
    console.log("\x1b[32m", "[destination script] Clearing the database.");
    let formattedArray = [];
    let countrysObj = await Location.findOne();

    if (countrysObj) {
      console.log("\x1b[35m", "[destination script] Already have");
    } else {
      const filePath = "uploads/csv/destination.csv";
      let results = await readCSV(filePath, 0);

      for (let data of results) {
        formattedArray.push({
          country: data.Country,
          location: data.Location,
          name: data.Name,
          country_name: getName(data.Country),
        });
      }

      // Divide data into two parts
      const midIndex = Math.floor(formattedArray.length / 2);
      const firstHalf = formattedArray.slice(0, midIndex);
      const secondHalf = formattedArray.slice(midIndex);

      await Location.insertMany(firstHalf)
        .then(async () => {
          console.log("\x1b[32m", "First half of data inserted successfully");
          // Insert second half into MongoDB
          await Location.insertMany(secondHalf);
        })
        .then(() => {
          console.log("\x1b[32m", "Second half of data inserted successfully");
        })
        .catch((err) => {
          console.log("\x1b[31m", "Error inserting data:", err);
          process.exit(1);
        });
    }

    console.log(
      "\x1b[32m",
      "[destination script] destination Automated Successfully."
    );
    process.exit(0);
  } catch (_) {
    console.log(
      "\x1b[31m",
      "[destination script] Error while automating destination."
    );
    console.log(_);
    process.exit(1);
  }
}
// automateDectinations();
module.exports = automateDectinations;
