const { number } = require("joi");
const mongoose = require("mongoose");

const AirportSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true
        },
        name: {
            type: String,

        },
        city: {
            type: String,

        },
        state: {
            type: String,

        },
        country: {
            type: String,

        }
    },
    { timestamps: true }
);

const Airport = mongoose.model("Airport", AirportSchema);

module.exports = Airport;