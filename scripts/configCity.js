require('dotenv').config();
const db = require('../src/configs/db');
const fs = require('fs');

const Citys = require('../uploads/json/countries.json');
const City = require('../src/models/City');


async function automateCitys() {
  console.log("\x1b[34m", "[Citys script] Automating Citys. It may take a while.");
  try {
    console.log("\x1b[32m", "[Citys script] Clearing the database.");

    let formattedArray = [];
    let CitysObj = await City.findOne();

    if (CitysObj) {
      console.log("\x1b[35m", "[Citys script] Already have");
    } else {

      let CityKey = Object.keys(Citys);
      for (let obj of CityKey) {
        for (let objcity of Citys[obj]) {
          formattedArray.push({
            name: objcity,
            country: obj,
          });
        }
      }
      await City.insertMany(formattedArray);
    }

    console.log("\x1b[32m", "[Citys script] Citys Automated Successfully.");

  } catch (_) {
    console.log("\x1b[31m", "[Citys script] Error while automating Citys.");
    console.log(_)
    process.exit(1);
  }
}


module.exports = automateCitys;