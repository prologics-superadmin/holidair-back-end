const holidayairBookingConfirm = require("../mail/holidayair-booking-confirm");
const holidayairBookingFailed = require("../mail/holidayair-booking-failed");
const sendMail = require("../mail/mail");
const FlightBookingService = require("../services/flight/FlightBookingService");
const HotelBookingService = require("../services/hotel/HotelBookingService");
const makeAPIRequest = require("../utils/flightRequest");
const makeHotelApiRequest = require("../utils/hotelRequest");
const jwt = require("jsonwebtoken");

const getLastDepartureDate = require("../helpers/genaralHelper");
const { User } = require("../models/UserManagement/User");
const penAirApiRequest = require("../utils/penAirRequest");
const MarkupService = require("../services/MarkupService");
const { parseString } = require("xml2js");
const fs = require("fs");
const paymentConfirmationRequest = require("../utils/paymantConfirmationRequest");
const penAirBookingId = require("../helpers/penAirBookingId");

class FlightBookingController {
  async bookFlight(req, res) {
    try {
      let decoded;
      let userId = "";
      const authToken = req.headers["x-access-token"];
      if (authToken) {
        if (
          authToken.split(" ")[1] !== undefined ||
          authToken.split(" ")[1] !== null ||
          authToken.split(" ")[1] !== ""
        ) {
          decoded = jwt.verify(
            authToken.split(" ")[1],
            process.env.JWT_SECRET_KEY
          );
          userId = decoded.userId;
        }
      } else {
        const user = await User.findOne({
          email: req.body.Email,
          is_deleted: false,
        });
        if (user) {
          userId = user._id;
        } else {
          // console.log(req.body.Pax);
          const user = await User.create({
            first_name: req.body.Pax[0].FirstName,
            last_name: req.body.Pax[0].LastName,
            email: req.body.Email,
            user_name: req.body.Email.split("@")[0],
          });
          userId = user._id;
        }
      }

      const bookingDetails = await FlightBookingService.create(
        req.body,
        userId
      );
      await FlightBookingService.createFlightCustomerAddress(
        bookingDetails._id,
        req.body.AddressInfo
      );
      await FlightBookingService.createPaxDetail(
        bookingDetails._id,
        req.body.Pax
      );
      const bookingResponse = await makeAPIRequest(
        "POST",
        "/flightpnr",
        req.body
      );

      const response = await FlightBookingService.getById(bookingDetails._id);

      const requestData = req.body;

      let ArrivalDate = "";

      let departDate = "";

      let departTime = "";
      let ticketDate = "";

      if (
        bookingResponse &&
        bookingResponse.result &&
        bookingResponse.result.status === "OK"
      ) {
        await FlightBookingService.updateBookingConfirmationDetails(
          bookingDetails._id,
          bookingResponse.result.pnrInfo[0],
          bookingResponse.result
        );

        let selectedObject;

        const data =
          bookingResponse.result.airSolutions[0].journey[0].airSegments;

        if (data.length % 2 === 0) {
          // If the length is even, get the middle object
          selectedObject = data[data.length / 2 - 1];
        } else {
          // If the length is odd, get the middle object
          selectedObject = data[Math.floor(data.length / 2)];
        }

        // await sendMail(
        //   response.email,
        //   "Booking confirmation",
        //   holidayairBookingConfirm({
        //     titel: "Flight",
        //     booking_id: bookingDetails.booking_id,
        //     status: true,
        //     from: data[0].origin,
        //     to: selectedObject.origin,
        //     departuredate: data[0].departDate,
        //     arrivaldate: selectedObject.arrivalDate,
        //     location: data[0].airlineName,
        //     total: bookingDetails.amount,
        //   })
        // );

        // const penAirResponse = await penAirApiRequest();

        if (
          bookingResponse.result != null ||
          bookingResponse.result != undefined
        ) {
          ArrivalDate = await getLastDepartureDate(
            bookingResponse.result.airSolutions[0].journey[0].airSegments
          );

          departDate =
            bookingResponse.result.airSolutions[0].journey[0].airSegments[0].departDatetime.split(
              " "
            )[0];
          departTime =
            bookingResponse.result.airSolutions[0].journey[0].airSegments[0].departDatetime.split(
              " "
            )[1];

          ticketDate = new Date().toISOString().split("T")[0];
        }

        const dateStr = departDate;
        const [day, month, year] = dateStr.split("/");
        const formattedDate = `${year}-${month}-${day}`;

        const penAir = await penAirApiRequest({
          TravelDate: "",
          FirstName: req.body.Pax[0].FirstName,
          LastName: req.body.Pax[0].LastName,
          Title: req.body.Pax[0].Title,
          Type: "",
          EMail: requestData.Email,
          TelePhone: requestData.ContactNo,
          PassengerName: req.body.Pax[0].FirstName,

          TicketNumber: req.body.TicketNumber,
          AirlineId: req.body.AirlineId,
          VLocator: "",
          TicketDate: ticketDate,
          IATANumber: req.body.IATANumber,
          Currency: "GBP",
          FareSellAmt:
            parseFloat(response.amount) - parseFloat(response.markup_amount),
          FareCommAmt: response.markup_amount,
          TotalSellAmt: response.amount,
          ValidatingAirlineId: "",
          TicketType: "",
          Issuer: "Brightsun",
          TaxType: "",
          TaxDescription: "",
          TaxSellAmt: "",
          VirtualCardNo: "",
          FlightNumber:
            bookingResponse.result.airSolutions[0].journey[0].airSegments[0]
              .flightNumber,
          ClassType:
            bookingResponse.result.airSolutions[0].journey[0].airSegments[0]
              .class,
          Status:
            bookingResponse.result.airSolutions[0].journey[0].airSegments[0]
              .status,
          DepartureDate: formattedDate,
          ArrivalDate: ArrivalDate.date,
          DepartureCityId:
            bookingResponse.result.airSolutions[0].journey[0].airSegments[0]
              .origin,
          ArrivalCityId: "",
          DepartureTime: departTime + ":00",
          ArrivalTime: ArrivalDate.time + ":00",
          FareBasis: "",
          DepartureTerminal:
            bookingResponse.result.airSolutions[0].journey[0].airSegments[0]
              .airport[0].originTerminal,
          ArrivalTerminal: "",
          FlightTime: "",
          Stops: bookingResponse.result.airSolutions[0].journey[0].stop,
          PCC: "4CHC",
          BookingId: bookingDetails.booking_id,
          Provider: "Brightsun",
          PNR: bookingResponse.result.pnrInfo[0].brightsunReference,
        });

        const orderNumber = await penAirBookingId(penAir);
        await FlightBookingService.updatePenAirOderId(
          bookingDetails._id,
          orderNumber
        );

        // res.status(200).json({ data: penAirResponse });
        const finalResponse = {
          status: "OK",
          flightBookingResponse: bookingResponse,
          bookingResponse: response,
          data: "",
        };
        res.status(200).json({ data: finalResponse });
      } else {
        // await sendMail(
        //   response.email,
        //   "Booking Failed",
        //   holidayairBookingFailed({
        //     titel: "Flight",
        //     booking_id: bookingDetails.booking_id,
        //   })
        // );
        res.status(500).json({ error: bookingResponse });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async getSelectedFlightPriceSearch(req, res) {
    try {
      const response = await makeAPIRequest("post", "/flightprice", req.body);
      const totalPrice1 = response.result.airSolutions[0].totalPrice;
      const totalPrice2 = response.result.airSolutions[1].totalPrice;

      const flightMarkupPrice = await MarkupService.getMarkupByType("Flight");

      // Calculate the new total with commission
      const totalWithCommission1 = totalPrice1 + flightMarkupPrice.amount ?? 0;
      const totalWithCommission2 = totalPrice2 + flightMarkupPrice.amount ?? 0;

      // Add the new property to the air solution object
      response.result.airSolutions[0].totalWithCommission =
        totalWithCommission1;
      response.result.airSolutions[0].markupValue =
        flightMarkupPrice.amount ?? 0;
      response.result.airSolutions[1].totalWithCommission =
        totalWithCommission2;
      response.result.airSolutions[1].markupValue =
        flightMarkupPrice.amount ?? 0;
      res.status(200).json({ data: response });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async updateBookingStatus(req, res) {
    try {
      // Check another string
      if (req.params.bookingId.startsWith("F")) {
        const bookingDetails = await FlightBookingService.updateBookingStatus(
          req.params.bookingId,
          req.body
        );
        const pnrReqParams = {
          AccountInfo: {
            CompanyCode: process.env.HOLIDAY_AIR_COMPANY_CODE,
            WebsiteName: process.env.HOLIDAY_AIR_WEBSITE_NAME,
          },
          BookingRef: bookingDetails.brightsun_reference,
          ApplicationAccessMode:
            process.env.HOLIDAY_AIR_APPLICATION_ACCESS_MODE,
        };
        const flightDetailsResponse = await makeAPIRequest(
          "POST",
          "/Getpnr",
          pnrReqParams
        );

        await sendMail(
          bookingDetails.email,
          "Booking confirmation",
          holidayairBookingConfirm({
            titel: "Flight",
            booking_id: bookingDetails.booking_id,
            status: true,
            from: bookingDetails.flight_data.airSolutions[0].journey[0]
              .airSegments[0].origin,
            to: bookingDetails.flight_data.airSolutions[0].journey[0]
              .airSegments[1].destination,
            departuredate:
              bookingDetails.flight_data.airSolutions[0].journey[0]
                .airSegments[0].departDatetime,
            arrivaldate:
              bookingDetails.flight_data.airSolutions[0].journey[0]
                .airSegments[1].arrivalDatetime,
            location: "TEST",
            total: bookingDetails.amount,
          })
        );

        const penAir = await paymentConfirmationRequest({
          PNR: bookingDetails.flight_data.pnrInfo[0].brightsunReference,
          OrderNumber: bookingDetails.penair_order_id,
          BookingId: req.params.bookingId,
          Amount: bookingDetails.amount,
        });

        // const eTicketReqParams = {

        // }

        // const getETicketDetails = await makeAPIRequest("POST", "/Eticket", eTicketReqParams)

        const finalResponse = {
          bookingDetails: bookingDetails,
          bookingConfirmationDetails: flightDetailsResponse,
        };
        res.status(200).json({ data: finalResponse });
      } else if (req.params.bookingId.startsWith("H")) {
        const bookingDetails = await HotelBookingService.updateBookingStatus(
          req.params.bookingId,
          req.body
        );
        const bookingDetailsResponse = await makeHotelApiRequest(
          "GET",
          `hotel-api/3.0/bookings/${bookingDetails.reference}`,
          "",
          ""
        );
        const finalResponse = {
          bookingDetails: bookingDetails,
          bookingConfirmationDetails: bookingDetailsResponse,
        };
        res.status(200).json({ data: finalResponse });
      } else {
        console.log(`${str2} starts with neither 'F' nor 'H'`);
        // Default condition if neither 'F' nor 'H'
      }

      res.status(200).json({ data: bookingDetails });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async updatePaymentStatus(req, res) {
    try {
      await FlightBookingService.updatePaymentStatus(req.params);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

module.exports = new FlightBookingController();
