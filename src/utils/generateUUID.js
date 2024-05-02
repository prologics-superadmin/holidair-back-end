async function generateUUID(Model, code, startAt = 1, codeLen = 4) {
  let count = (await Model.countDocuments()) + startAt;
  let codeLength = codeLen;

  while (true) {
    const paddedCount = count.toString().padStart(codeLength, "0");
    const uuid = code + paddedCount;

    // Check if the generated UUID already exists in the database
    const existingDocument = await Model.findOne({ UUID: uuid });

    if (!existingDocument) {
      return uuid; // Return the unique UUID
    }

    // If the UUID already exists, increment count and adjust code length if necessary
    count++;
    if (count >= Math.pow(10, codeLength)) {
      codeLength++;
    }
  }
}

async function generateUUIDs(Model, code, startAt = 1, codeLen = 4, quantity) {
  let count = (await Model.countDocuments()) + startAt;
  let codeLength = codeLen;
  const uuids = [];

  for (let i = 0; i < quantity; i++) {
    while (true) {
      const paddedCount = count.toString().padStart(codeLength, "0");
      const uuid = code + paddedCount;

      // Check if the generated UUID already exists in the database
      const existingDocument = await Model.findOne({ UUID: uuid });

      if (!existingDocument) {
        uuids.push(uuid); // Add the unique UUID to the array
        break;
      }

      // If the UUID already exists, increment count and adjust code length if necessary
      count++;
      if (count >= Math.pow(10, codeLength)) {
        codeLength++;
      }
    }
  }

  return uuids; // Return the array of unique UUIDs
}

exports.generateUUID = generateUUID;
exports.generateUUIDs = generateUUIDs;
