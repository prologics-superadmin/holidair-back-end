require('dotenv').config();
const db = require('../src/configs/db');
const PermissionCategory = require('../src/models/UserManagement/Permissions/PermissionCategory');
const PermissionGroup = require('../src/models/UserManagement/Permissions/PermissionGroup');
const Permission = require('../src/models/UserManagement/Permissions/Permission');
const PermissionCheckBoxes = require('../src/models/UserManagement/Permissions/PermissionCheckBoxes');
const fs = require('fs');

const Airlines = require('../uploads/json/airlines.json');
const Airline = require('../src/models/Airline');


async function automateAirlines() {
    console.log("\x1b[34m", "[Airlines script] Automating Airlines. It may take a while.");
    try {
        console.log("\x1b[32m", "[Airlines script] Clearing the database.");


        for (let obj of Airlines) {

            let AirlinesObj = await Airline.findOne({ code: obj.id });

            if (AirlinesObj) {
                console.log("\x1b[35m", "[Airlines script] Already have");
                continue
            }

            let formattedArray = [];
            formattedArray.push({
                logo: obj.logo,
                code: obj.id,
                name: obj.name,
            });
            await Airline.create(formattedArray);
        }
        console.log("\x1b[32m", "[Airlines script] Airlines Automated Successfully.");
        process.exit(0);
    } catch (_) {
        console.log("\x1b[31m", "[Airlines script] Error while automating Airlines.");
        console.log(_)
        process.exit(1);
    }
}


automateAirlines();