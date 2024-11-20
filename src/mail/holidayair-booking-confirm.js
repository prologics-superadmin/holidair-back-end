module.exports = (data) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-Ticket</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">

    <div style="padding: 20px;">

        <!-- Invoice Header -->
        <div style="text-align: right; margin-bottom: 10px;">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0DTdL4AMEYJX9GtkkV12wG7DmtUVPD5KIpQ&s" alt="Your Logo" style="max-height: 50px;">
        </div>
        <div style="text-align: center; margin-bottom: 10px; padding-bottom: 20px;">
            <h1 style="font-size: 20px; margin: 0; font-weight: 600;">E-TICKET</h1>
        </div>

        <!-- Ticket Details -->
        <div>
            <div style="display: flex; justify-content: space-between;">
                <div style="width: 48%; display: flex;">
                    <p style="font-size: 14px; font-weight: 600; margin: 0; padding-right: 20px;">Passenger Name</p>
                    <p style="font-size: 14px; margin: 0;">${data.paxName}</p>
                </div>
                <div style="width: 48%; display: flex;">
                    <p style="font-size: 14px; font-weight: 600; margin: 0; padding-right: 20px;">E-Ticket Number</p>
                    <p style="font-size: 14px; margin: 0;">00</p>
                </div>
            </div>
        </div>

        <div style="border: 1px solid #000; padding: 10px; margin-top: 20px;">
            <div style="display: flex; justify-content: space-between;">
                <div style="width: 30%;  display: flex; ">
                    <p style="font-size: 14px; font-weight: 600; margin: 0; padding-right: 20px;">Booking Ref</p>
                    <p style="font-size: 14px; margin: 0;">${data.booking_id}</p>
                </div>
                <div style="width: 30%;  display: flex; ">
                    <p style="font-size: 14px; font-weight: 600; margin: 0; padding-right: 20px;">Destination</p>
                    <p style="font-size: 14px; margin: 0;">${data.destination}</p>
                </div>
                <div style="width: 30%;  display: flex;">
                    <p style="font-size: 14px; font-weight: 600; margin: 0; padding-right: 20px;">Departure Date</p>
                    <p style="font-size: 14px; margin: 0;">${data.departuredate}</p>
                </div>
            </div>
            <div style="display: flex; justify-content: space-between;">
                <div style="width: 30%;  display: flex;  ">
                    <p style="font-size: 14px; font-weight: 600; margin: 0; padding-right: 20px;">Your Ref</p>
                    <p style="font-size: 14px; margin: 0;"></p>
                </div>
                <div style="width: 30%;  display: flex; ">
                    <p style="font-size: 14px; font-weight: 600; margin: 0;padding-right: 20px;">Agent</p>
                    <p style="font-size: 14px; margin: 0;">Sujith</p>
                </div>
            </div>
        </div>

        <div>
            <div style="margin-top: 20px; border-bottom: 2px solid #000;">
                <div style="display: flex; justify-content: space-between;">
                    <div style="width: 48%;  display: flex;  gap: 20px;">
                        <p style="font-size: 16px; font-weight: 600; margin: 0;">${data.departureDate}</p>
                    </div>
                    <div style="width: 48%;  display: flex;  gap: 20px;">
                        <p style="font-size: 12px; font-weight: 600; margin: 0;">Airline Booking Ref: UNFQFN</p>
                    </div>
                </div>
            </div>
            <div style="margin-top: 20px;">
                <div style="display: flex;">
                    <div style="width: 50%;">
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; font-weight: 600; margin: 0;">Airline</p>
                            <p style="font-size: 14px; margin: 0;">${data.airline1}</p>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; font-weight: 600; margin: 0;">Departure City</p>
                            <p style="font-size: 14px; margin: 0;">${data.originAirport1}</p>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; font-weight: 600; margin: 0;">Dep. Terminal</p>
                            <p style="font-size: 14px; margin: 0;">${data.depTerminal1}</p>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; font-weight: 600; margin: 0;">Arrival City</p>
                            <p style="font-size: 14px; margin: 0;">${data.arrivalCity1}</p>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; font-weight: 600; margin: 0;">Flight Duration</p>
                            <p style="font-size: 14px; margin: 0;">6.4</p>
                        </div>
                    </div>
                    <div style="width: 25%;">
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; font-weight: 600; margin: 0;">Flight</p>
                            <p style="font-size: 14px; margin: 0;">${data.flightNumber1}</p>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; font-weight: 600; margin: 0;">Dep. Time</p>
                            <p style="font-size: 14px; margin: 0;">${data.departTime1}</p>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; font-weight: 600; margin: 0;">Arr. Time</p>
                            <p style="font-size: 14px; margin: 0;">${data.arrivalTime1}</p>
                        </div>
                    </div>
                    <div style="width: 25%;">
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; font-weight: 600; margin: 0;">Status</p>
                            <p style="font-size: 14px; margin: 0;">${data.status1}</p>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; font-weight: 600; margin: 0;">Class</p>
                            <p style="font-size: 14px; margin: 0;">${data.class1}</p>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; font-weight: 600; margin: 0;">Arrive</p>
                            <p style="font-size: 14px; margin: 0;">${data.arrivalDateTime1}</p>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; font-weight: 600; margin: 0;">GDS PNR</p>
                            <p style="font-size: 14px; margin: 0;">95SKM1</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div style="margin-top: 20px; border-bottom: 2px solid #000;">
                <div style="display: flex; justify-content: space-between;">
                    <div style="width: 48%;  display: flex;  gap: 20px;">
                        <p style="font-size: 16px; font-weight: 600; margin: 0;">Saturday, December 21, 2024</p>
                    </div>
                    <div style="width: 48%;  display: flex;  gap: 20px;">
                        <p style="font-size: 12px; font-weight: 600; margin: 0;">Airline Booking Ref: UNFQFN</p>
                    </div>
                </div>
            </div>
            <div style="margin-top: 20px;">
                <div style="display: flex;">
                    <div style="width: 50%;">
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; font-weight: 600; margin: 0;">Airline</p>
                            <p style="font-size: 14px; margin: 0;">GF</p>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; font-weight: 600; margin: 0;">Departure City</p>
                            <p style="font-size: 14px; margin: 0;">London-Heathrow (LHR)-United Kingdom</p>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; font-weight: 600; margin: 0;">Dep. Terminal</p>
                            <p style="font-size: 14px; margin: 0;">T4</p>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; font-weight: 600; margin: 0;">Arrival City</p>
                            <p style="font-size: 14px; margin: 0;">Bahrain-Bahrain Intl Arpt (BAH)-Bahrain</p>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; font-weight: 600; margin: 0;">Flight Duration</p>
                            <p style="font-size: 14px; margin: 0;">6.4</p>
                        </div>
                    </div>
                    <div style="width: 25%;">
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; font-weight: 600; margin: 0;">Flight</p>
                            <p style="font-size: 14px; margin: 0;">GF2</p>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; font-weight: 600; margin: 0;">Dep. Time</p>
                            <p style="font-size: 14px; margin: 0;">930</p>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; font-weight: 600; margin: 0;">Arr. Time</p>
                            <p style="font-size: 14px; margin: 0;">1910</p>
                        </div>
                    </div>
                    <div style="width: 25%;">
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; font-weight: 600; margin: 0;">Status</p>
                            <p style="font-size: 14px; margin: 0;">HK</p>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; font-weight: 600; margin: 0;">Class</p>
                            <p style="font-size: 14px; margin: 0;">Economy</p>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; font-weight: 600; margin: 0;">Arrive</p>
                            <p style="font-size: 14px; margin: 0;">12/21/2024</p>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; font-weight: 600; margin: 0;">GDS PNR</p>
                            <p style="font-size: 14px; margin: 0;">95SKM1</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div style="margin-top: 20px;">
            <div style="margin: 20px;">
                <h6>Terms and Conditions</h6>
                <p style="font-size: 12px; font-weight: 600; margin: 0;text-align: justify;">
                    1. Passenger Protection

                    When you buy an ATOL protected air holiday package or flight from Holiday Air Ltd you will receive a Confirmation Invoice from us (or our authorized agent through which you booked) confirming your arrangements and your protection under our Air Travel Organiser’s Licence number 9425. In the unlikely event of our insolvency, the CAA will ensure that you are not stranded abroad and will arrange to refund any money you have paid to us for an advance booking. For further information visit the ATOL website at www.atol.org.ukNot all holiday or travel services offered and sold by us will be protected by the ATOL Scheme. Please ask us to confirm what protection may apply to your booking."Our website may contain links to other sites not controlled by us. These sites may collect data and personal information. We are not responsible for the actions, content, privacy policies or the passenger protection in the event of insolvency offered by those websites to which our website may link. It is your responsibility to check the status of these sites."
                    2. EU Regulations on Passenger Disruption
                    Denied Boarding Compensation – EC Regulation 261/2004

                    Regulation No 261/2004 of the European Parliament and of the Council of 11 February 2004 establishes common rules on compensation and assistance to passengers in the event of denied boarding and of cancellation or long delay of flights, and repeals Regulation No 295/91The provisions of EC Regulation 261/2004 regarding measures to address the denied boarding of a passenger on a commercial flight, or to cater for instances of long delays/ flight cancellations come into force as from the 17th February 2005.For further information on this regulation visit The Department of Transport Website.
                    3. Foreign Office Advice

                    Before you enter into any contracts with us, may we recommend that you check the Foreign Office advice on your holiday destination.For further information visit The Foreign and Commonwealth Office website at:www.atol.org.uk.
                    4. Booking Conditions

                    The conditions vary whether you book a seat only on an airline or a "package". A package is a combination of at least 2 travel components, sold to you as an inclusive price fully payable to The Company. The conditions relating to a package are outlined in paragraph "Inclusive holidays".This contract is made under the terms of these Booking Conditions which are governed by English Law and both parties shall submit to the jurisdiction of the English Courts at all times.For Airline tickets only, accommodation only or services such as car rental, insurance or other, The Company acts as a booking agent. Your contract is with the suppliers and their conditions apply.Any booking made by you on our website or otherwise shall be deemed an offer by you to purchase the relevant travel arrangements.No contract between you and the Company shall come into existence until the Company accepts full payment and issues a confirmation invoice.
                    5. Alteration and Cancellation of Airline Tickets

                    Airline tickets are not transferable under any circumstances. Name changes are not allowed on a booking even if the ticket is not yet issued.It is imperative that names given at time of booking match exactly the names on the passports as the airlines regard any amendments as name changes and will be regarded as a cancellation and re-booking therefore incurring cancellation charges as stated below.The following cancellation fees may apply to the ticket you have purchased: 
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div>
            <div>
                <p style="font-size: 10px; padding-bottom: 0%; margin-bottom: 5%; margin-top: 5%; text-align: center;">
                    Holiday Air Limited, <br/> 130 High Street, Barnet Herts, EN5 5XQ<br/>
                    Tel +44 (0) 208 44 00 770, +44 7534433111, Email: info@holidayair.com
                </p>
            </div>
            <div style="font-size: 12px; display: flex; justify-content: space-between; margin-bottom: 20px;">
                <p style="margin: 0; font-weight: 700; width: 50%;">Powered by: <span style="font-weight: 200;"> Name</span></p>
                <p style="margin: 0; font-weight: 700; width: 50%; text-align: right;">04/Oct/2024 <span style="font-weight: 200; margin-left: 20px;"> 15:31:12</span></p>
            </div>
    
        </div>

    </div>

</body>
</html>
 `;
};
