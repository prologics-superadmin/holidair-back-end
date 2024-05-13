require('dotenv').config();
const db = require('../src/configs/db');
const PermissionCategory = require('../src/models/UserManagement/Permissions/PermissionCategory');
const PermissionGroup = require('../src/models/UserManagement/Permissions/PermissionGroup');
const Permission = require('../src/models/UserManagement/Permissions/Permission');
const PermissionCheckBoxes = require('../src/models/UserManagement/Permissions/PermissionCheckBoxes');
const fs = require('fs');

const Airports = require('../uploads/json/Airports.json');
const Airport = require('../src/models/Airport');



async function automateAirports() {
    console.log("\x1b[34m", "[Airport script] Automating Airport. It may take a while.");
    try {
        console.log("\x1b[32m", "[Airport script] Clearing the database.");

        let AirportsObj = await Airport.findOne();

        if (AirportsObj) {
            console.log("\x1b[35m", "[Airports script] Already have");
        } else {
            await Airport.create(Airports);
        }


        console.log("\x1b[32m", "[Airport script] Airport Automated Successfully.");
        process.exit(0);
    } catch (_) {
        console.log("\x1b[31m", "[Airport script] Error while automating Airport.");
        console.log(_)
        process.exit(1);
    }
}


automateAirports();