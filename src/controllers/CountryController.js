const CountryService = require("../services/CountryService");
const fs = require("fs");
const csv = require("csv-parser");
const Country = require("../models/Country");
const City = require("../models/City");

class CountryController {
  async createCountryList() {
    const results = [];
    const countries = [];
    return new Promise((resolve, reject) => {
      const filePath = "uploads/csv/country.csv";
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => {
          //   console.log(data);
          // Prepare the country object
          countries.push({
            name: data.CountryName,
            code: data.CountryId,
          });
        })
        .on("end", async () => {
          try {
            // console.log(countries);
            // Insert all at once using insertMany
            await Country.insertMany(countries);
            console.log(
              "CSV file has been processed and data has been added to the database."
            );
            resolve();
          } catch (error) {
            console.error("Error saving countries to database:", error);
            reject(error);
          }
        })
        .on("error", (error) => {
          console.error("Error reading the CSV file:", error);
          reject(error);
        });
    });
  }

  async getList(req, res) {
    try {
      const response = await CountryService.getList(req.body);
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createCityList() {
    const cities = [];
    const filePath = "uploads/json/countries.json";
    const data = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(data);
    let formattedArray = [];
    for (let country in jsonData) {
      if (jsonData.hasOwnProperty(country)) {
        jsonData[country].forEach((city) => {
          formattedArray.push({
            name: city,
            country: country,
          });
        });
      }
    }

    await City.insertMany(formattedArray);
  }

  async getCityList(req, res) {
    try {
      const response = await CountryService.getCityList(req.body);
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAirportsList(req, res) {
    try {
      const response = await CountryService.getAirportList(req.body);
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAirlineList(req, res) {
    try {
      const response = await CountryService.getAirlineList(req.body);
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAirports(req, res) {
    try {
      const response = await CountryService.getAirports(req.params);
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAirLines(req, res) {
    try {
      const response = await CountryService.getAirLines(req.params);
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getCountry(req, res) {
    try {
      const response = await CountryService.getCountry(req.params);
      res.status(200).json({ message: "", data: response });
    } catch (_) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new CountryController();
