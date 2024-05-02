const fs = require("fs");
const csvParser = require("csv-parser");
const { Transform } = require("stream");

class SkipLines extends Transform {
  constructor(options = {}) {
    super(options);
    this.lineCount = 0;
    this.skip = options.skip || 0;
  }

  _transform(chunk, encoding, callback) {
    const lines = chunk.toString().split("\n");
    const start = this.lineCount < this.skip ? this.skip - this.lineCount : 0;
    this.lineCount += lines.length;
    this.push(lines.slice(start).join("\n"));
    callback();
  }
}

/**
 * Convert CSV file to an array of objects.
 *
 * @param {String} filePath  - path of the csv file
 * @returns {Promise<object[]>} - return an array of objects
 */
async function readCSV(filePath = "", skip = 0) {
  try {
    let items = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(new SkipLines({ skip }))
        .pipe(csvParser())
        .on("data", async (row) => {
          items.push(row);
        })
        .on("end", async () => {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
            }
          });
          resolve(items);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  } catch (error) {
    console.log(error);
    return [];
  }
}

function filterArray(array, properties) {
  return array.filter(obj => 
      properties.every(prop => obj.hasOwnProperty(prop))
  );
}

exports.readCSV = readCSV;
exports.filterArray = filterArray;
