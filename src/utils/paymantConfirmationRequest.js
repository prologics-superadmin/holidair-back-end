const axios = require("axios");
async function paymentConfirmationRequest(data) {
  try {
    const { PNR, OrderNumber, BookingId, Amount } = data;
    const xmlData = `<?xml version="1.0" encoding="utf-8"?>
  <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
      <FolderReceipt xmlns="http://www.penguininc.com/">
        <FolderReceiptRQ>
          <FolderReceipt>
            <Login>
              <Username>HolidayAir</Username>
              <Password>3B68386438759368</Password>
            </Login>
            <PNRLocator>${PNR}</PNRLocator>
            <OrderNo>${OrderNumber}</OrderNo>
  <InetRef>${BookingId}</InetRef>
            <Payment>
              <PaymentDetails>
                <Amount>${Amount}</Amount>
                <Currency>GBP</Currency>
                <PaymentType>Bank</PaymentType>
                <PaymentMethod>BACS</PaymentMethod>
                <PaymentRef>Reference</PaymentRef>
                <BankUserCode>xxxx</BankUserCode>
              </PaymentDetails>
            </Payment>
          </FolderReceipt>
        </FolderReceiptRQ>
      </FolderReceipt>
    </soap12:Body>
  </soap12:Envelope>
  `;

    console.log(xmlData);

    const response = await axios({
      method: "POST",
      url: "https://penairdemo17.pensupport.co.uk/PenAIR/Penairdemo17/WebServices/FolderOrder2Cash/FolderOrder2Cash.asmx",
      headers: {
        "Content-Type": "text/xml",
      },
      data: xmlData,
    });

    // console.log("xml", xmlData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    fs.writeFileSync(
      "error_log.txt",
      `Error: ${error.message}\nStack: ${error.stack}`
    );
    return error;
  }
}

module.exports = paymentConfirmationRequest;
