require('dotenv').config();
const db = require('../src/configs/db');
const fs = require('fs');

const Airlines = require('../uploads/json/airlines.json');
const Airline = require('../src/models/Airline');


async function automateAirlines() {
    console.log("\x1b[34m", "[Airlines script] Automating Airlines. It may take a while.");
    try {
        console.log("\x1b[32m", "[Airlines script] Clearing the database.");

        let AirlinesObj = await Airline.findOne();

        if (AirlinesObj) {
            console.log("\x1b[35m", "[Airlines script] Already have");
        } else {
            let formattedArray = [];

            for (let obj of Airlines) {

                formattedArray.push({
                    logo: obj.logo,
                    code: obj.id,
                    name: obj.name,
                });
            }
            await Airline.create(formattedArray);
        }
        console.log("\x1b[32m", "[Airlines script] Airlines Automated Successfully.");

    } catch (_) {
        console.log("\x1b[31m", "[Airlines script] Error while automating Airlines.");
        console.log(_)
        process.exit(1);
    }
}


module.exports = automateAirlines;