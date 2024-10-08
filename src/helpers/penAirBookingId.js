const xml2js = require("xml2js");

async function penAirBookingId(xmlString) {
  try {
    // Parse the outer XML
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xmlString);

    // Access the FolderCreateClientResult
    const folderCreateClientResult =
      result["soap:Envelope"]["soap:Body"][0]["FolderCreateClientResponse"][0][
        "FolderCreateClientResult"
      ][0];

    // Parse the inner XML contained in FolderCreateClientResult
    const innerParser = new xml2js.Parser();
    const innerResult = await innerParser.parseStringPromise(
      folderCreateClientResult
    );

    // Extract the OrderNo
    const orderNo = innerResult["FolderCreateResponse"]["OrderNo"][0];
    return orderNo;
  } catch (error) {
    console.error("Error parsing XML:", error);
    return null;
  }
}

module.exports = penAirBookingId;
