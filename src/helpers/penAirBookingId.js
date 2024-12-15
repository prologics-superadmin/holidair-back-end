const xml2js = require("xml2js");
const ApiRequestLogService = require("../services/ApiRequestLogService");

async function penAirBookingId(xmlString, browserData, ip) {
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

    // await ApiRequestLogService.create({
    //   request: JSON.stringify(xmlString),
    //   response: JSON.stringify(result),
    //   browserData: browserData,
    //   ip: ip,
    //   success_status: true,
    //   endpoint: "PenAir creation",
    // });

    // Extract the OrderNo
    const orderNo = innerResult["FolderCreateResponse"]["OrderNo"][0];
    return orderNo;
  } catch (error) {
    // await ApiRequestLogService.create({
    //   request: JSON.stringify(xmlString),
    //   response: JSON.stringify(error),
    //   browserData: browserData,
    //   ip: ip,
    //   success_status: false,
    //   endpoint: "PenAir creation",
    // });
    console.error("Error parsing XML:", error);
    return null;
  }
}

module.exports = penAirBookingId;
