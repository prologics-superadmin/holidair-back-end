const configAirline = require("./configAirline");
const configAirport = require("./configAirport");
const configCity = require("./configCity");
const configCountry = require("./configCountry");
const configDectination = require("./configDectination");




async function automateAllRun() {
    await configAirline();
    await configAirport();
    await configCity();
    await configCountry();
    await configDectination();
    process.exit(0);
}


automateAllRun();