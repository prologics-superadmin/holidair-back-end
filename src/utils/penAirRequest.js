const xml2js = require("xml2js");
const axios = require("axios");
const fs = require("fs");

async function penAirApiRequest(data) {
  try {
    const {
      TravelDate,
      FirstName,
      LastName,
      Title,
      Type,
      EMail,
      TelePhone,
      PassengerName,
      TicketNumber,
      AirlineId,
      VLocator,
      TicketDate,
      IATANumber,
      Currency,
      FareSellAmt,
      FareCommAmt,
      TotalSellAmt,
      ValidatingAirlineId,
      TicketType,
      Issuer,
      TaxType,
      TaxDescription,
      TaxSellAmt,
      VirtualCardNo,
      FlightNumber,
      ClassType,
      Status,
      DepartureDate,
      ArrivalDate,
      DepartureCityId,
      ArrivalCityId,
      DepartureTime,
      ArrivalTime,
      FareBasis,
      DepartureTerminal,
      ArrivalTerminal,
      FlightTime,
      Stops,
      PCC,
      BookingId,
      Provider,
      PNR,
    } = data;

    const xmlData = `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <FolderCreateClient xmlns="http://www.penguininc.com/">
        <xmlstring>
          <![CDATA[<FolderCreate xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
            <Login>
              <Username>HolidayAir</Username>
              <Password>3B68386438759368</Password>
            </Login>
            <Version>100</Version>
            <Provider>${Provider}</Provider>
            <PNRLocator>${PNR}</PNRLocator>
            <Source>PENXML_SABRE</Source>
            <FolderMaster>
              <OrderNo></OrderNo>
              <CustomerUserCode></CustomerUserCode>
              <PONO></PONO>
              <MarketingCode></MarketingCode>
              <DestinationCityId></DestinationCityId>
              <BusinessAreaId></BusinessAreaId>
              <BookedBy></BookedBy>
              <InetRef>${BookingId}</InetRef>
              <ForeignCurrencyId></ForeignCurrencyId>
              <BranchId></BranchId>
              <TravelDate>${TravelDate}</TravelDate>
              <DeliveryAddress />
            </FolderMaster>
            <Passenger>
              <PassengerMaster>
                <FirstName>${FirstName}</FirstName>
                <LastName>${LastName}</LastName>
                <Title>${Title}</Title>
                <Type>${Type}</Type>
                <EMail>${EMail}</EMail>
                <TelePhone>${TelePhone}</TelePhone>
              </PassengerMaster>
            </Passenger>
            <Airticket>
              <AirTicketDetails>
                <PassengerName>${PassengerName}</PassengerName>
                <TicketNumber>${TicketNumber}</TicketNumber>
                <AirlineId>${AirlineId}</AirlineId>
                <VLocator>${VLocator}</VLocator>
                <TicketDate>${TicketDate}</TicketDate>
                <IATANumber>${IATANumber}</IATANumber>
                <Currency>${Currency}</Currency>
                <FareSellAmt>${FareSellAmt}</FareSellAmt>
                <FareCommAmt>${FareCommAmt}</FareCommAmt>
                <TotalSellAmt>${TotalSellAmt}</TotalSellAmt>
                <ValidatingAirlineId>${ValidatingAirlineId}</ValidatingAirlineId>
                <TicketType>${TicketType}</TicketType>
                <Issuer>${Issuer}</Issuer>
                <InternationalIndicator></InternationalIndicator>
                <Tax>
                  <TaxDetails>
                    <TaxType>${TaxType}</TaxType>
                    <TaxDescription>${TaxDescription}</TaxDescription>
                    <TaxSellAmt>${TaxSellAmt}</TaxSellAmt>
                    <Currency>${Currency}</Currency>
                  </TaxDetails>
                </Tax>
                <FareRemarks></FareRemarks>
                <PayMode />
                <CompanyCardDetails>
                  <Amount>0</Amount>
                  <VirtualCardNo>${VirtualCardNo}</VirtualCardNo>
                </CompanyCardDetails>
              </AirTicketDetails>
            </Airticket>
            <Airsegment>
              <AirSegDetails>
                <AirlineId>${AirlineId}</AirlineId>
                <FlightNumber>${FlightNumber}</FlightNumber>
                <ClassType>${ClassType}</ClassType>
                <Status>${Status}</Status>
                <DepartureDate>${DepartureDate}</DepartureDate>
                <ArrivalDate>${ArrivalDate}</ArrivalDate>
                <DepartureCityId>${DepartureCityId}</DepartureCityId>
                <ArrivalCityId>${ArrivalCityId}</ArrivalCityId>
                <DepartureTime>${DepartureTime}</DepartureTime>
                <ArrivalTime>${ArrivalTime}</ArrivalTime>
                <FareBasis>${FareBasis}</FareBasis>
                <DepartureTerminal>${DepartureTerminal}</DepartureTerminal>
                <ArrivalTerminal>${ArrivalTerminal}</ArrivalTerminal>
                <BaggageAllowance></BaggageAllowance>
                <FlightTime>${FlightTime}</FlightTime>
                <Stops>${Stops}</Stops>
                <PCC>${PCC}</PCC>
                <VLocator>${VLocator}</VLocator>
              </AirSegDetails>
            </Airsegment>
            <Others />
          </FolderCreate>]]>
        </xmlstring>
      </FolderCreateClient>
    </soap:Body>
  </soap:Envelope>`;

    const response = await axios({
      method: "POST",
      url: process.env.PEN_AIR_URL,
      headers: {
        "Content-Type": "text/xml",
        SOAPAction: "http://www.penguininc.com/FolderCreateClient",
      },
      data: xmlData,
      timeout: 5000, // Increase timeout to 5 seconds
      maxContentLength: 2000000, // Limit response size to 2MB (adjust as needed)
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("Response Data:", error.response.data);
      console.log("Response Status:", error.response.status);
      console.log("Response Headers:", error.response.headers);
    } else if (error.request) {
      console.log("No response received", error.request);
    } else {
      console.log("Error:", error.message);
    }
  }
}

module.exports = penAirApiRequest;
