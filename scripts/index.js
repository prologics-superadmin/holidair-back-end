const configAirline = require("./configAirline");
const configAirport = require("./configAirport");
const configCity = require("./configCity");
const configCountry = require("./configCountry");




async function automateAllRun() {
    await configAirline();
    await configAirport();
    await configCity();
    await configCountry();
    process.exit(0);
}


automateAllRun();