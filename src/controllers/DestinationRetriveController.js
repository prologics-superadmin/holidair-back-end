const axios = require("axios");

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const Country = require("../models/Country");
const HotelDestination = require("../models/HotelDestination");
const ActivityDestination = require("../models/ActivityDestination");
const InternationalAirport = require("../models/InternationlAirport");
const { parse } = require("csv-parse/sync");

class DestinationRetriveController {
  async hotelDestinations(req, res) {
    try {
      const countries = await Country.find();

      const baseURL = "https://api.test.hotelbeds.com/hotel-content-api";
      const endpoint = "1.0/locations/destinations";
      const timestamp = Math.floor(Date.now() / 1000);
      const toHash = `33f1953dbdd40e5435b9a6c25fa106f7c094a400c4${timestamp}`;
      const xSignature = crypto
        .createHash("sha256")
        .update(toHash)
        .digest("hex");

      const headers = {
        "Api-key": "33f1953dbdd40e5435b9a6c25fa106f7",
        "X-Signature": xSignature,
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br",
      };

      const destinations = []; // Array to store all destinations

      for (const country of countries) {
        const url = `${baseURL}/${endpoint}`;

        const params = {
          fields: "all", // Request all fields
          countryCodes: country.code, // Country code for the query
          language: "ENG", // Language code (e.g., "ENG" for English)
          from: 1, // Starting record
          to: 100, // Ending record (adjust as needed)
          useSecondaryLanguage: true, // Use secondary language if required
          lastUpdateTime: "2020-03-03", // Adjust to filter records by date
        };

        try {
          const response = await axios.get(url, { headers, params });
          if (response.data && response.data.destinations) {
            if (response.data.destinations.length > 0) {
              // console.log(response.data.destinations);
              for (const destination of response.data.destinations) {
                // console.log(destination.name.content);
                // return;
                HotelDestination.create({
                  code: destination.code,
                  name: destination.name
                    ? destination.name.content
                      ? destination.name.content
                      : ""
                    : "",
                  country_code: country.code,
                  country: country.name,
                });
                destinations.push(destination);
              }
            } else {
              console.log(
                `No destinations found for country code: ${country.code}`
              );
            }

            // Append destinations
          } else {
            console.log(
              `No destinations found for country code: ${country.code}`
            );
          }
        } catch (error) {
          console.error(
            `Error fetching destinations for country code ${code}:`,
            error.message
          );
        }
      }
      res.status(200).json({ message: "Destinations Added Successfully" });
      // console.log("Fetched destinations:", destinations);
      return destinations;
    } catch (error) {
      throw error;
    }
  }

  async activityDestination(req, res) {
    try {
      const baseURL =
        "https://api.test.hotelbeds.com/activity-content-api/3.0/destinations";

      // Generate the timestamp and signature
      const timestamp = Math.floor(Date.now() / 1000);
      const toHash = `52f28425029bfd3ede73457d799c7257b7953ce67b${timestamp}`;
      const xSignature = crypto
        .createHash("sha256")
        .update(toHash)
        .digest("hex");

      // Define the headers to match the screenshot
      const headers = {
        "Api-key": "52f28425029bfd3ede73457d799c7257",
        "X-Signature": xSignature,
        Accept: "*/*", // Match the exact Accept header
        "Accept-Encoding": "gzip, deflate, br", // Match Accept-Encoding
        "User-Agent": "axios/1.7.7", // Use the User-Agent shown
        Connection: "keep-alive", // Match the Connection header
        Host: "api.test.hotelbeds.com", // Specify the Host header
        "Cache-Control": "no-cache", // Match Cache-Control
      };

      const countries = await Country.find();
      //   console.log(countries);

      for (const country of countries) {
        const url = `${baseURL}/en/${country.code}`;

        // Fetch data from the API
        const response = await axios.get(url, { headers });

        // Return the data from the response
        if (response.data) {
          if (response.data.country) {
            ActivityDestination.deleteMany();
            for (const destination of response.data.country.destinations) {
              ActivityDestination.create({
                name: destination.name,
                code: destination.code,
                country_code: country.code,
                country: country.name,
              });
              console.log("updated", destination.name, country.name);
            }
          } else {
            console.log("no data for", country.name);
          }

          //   return;
        } else {
          console.error("No data received from API.");
          return null;
        }
      }
      res.status(200).json({ message: "Destinations Added Successfully" });
      // Construct the URL
    } catch (error) {
      console.error("Error fetching destinations:", error.message);
      throw error;
    }
  }

  async fetchAndSaveAirports(req, res) {
    try {
      // Fetch data from the URL
      const response = await axios.get(
        "https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat"
      );
      const rawData = response.data;

      // Parse CSV data
      const records = parse(rawData, {
        delimiter: ",",
        trim: true,
      });

      // Map CSV rows to Airport model fields
      const airportData = records.map((row) => ({
        name: row[1],
        city: row[2],
        country: row[3],
        iata: row[4] || null,
        icao: row[5] || null,
        latitude: parseFloat(row[6]),
        longitude: parseFloat(row[7]),
        altitude: parseInt(row[8], 10),
        timezone: row[9] || null,
        dst: row[10] || null,
        tzDatabase: row[11] || null,
        type: row[12] || null,
        source: row[13] || null,
      }));

      // Save data to MongoDB
      for (const airport of airportData) {
        await InternationalAirport.create(airport);
      }
      res.status(200).json({ message: "Airports Added Successfully" });

      console.log("Airports saved successfully!");
    } catch (error) {
      console.error("Error fetching or saving airports:", error.message);
    }
  }
}

module.exports = new DestinationRetriveController();
