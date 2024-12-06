const getClientIp = require("../helpers/genaralHelper");
const sendErrorNotificationEmail = require("../helpers/genaralHelper");
const { getHighestAndLowestPrices } = require("../helpers/hotelSearchHelper");
const ApiRequestLogService = require("../services/ApiRequestLogService");
const MarkupPriceService = require("../services/MarkupPriceService");
const { getPrice } = require("../services/MarkupPriceService");
const makeHotelApiRequest = require("../utils/hotelRequest");

class HotelSearchController {
  async searchHotels(req, res) {
    const ip = await getClientIp(req);
    try {
      const response = await makeHotelApiRequest(
        "GET",
        "hotel-content-api/1.0/hotels",
        req.body.params,
        ""
      );

      const hotelIds = response.hotels.map((hotel) => parseInt(hotel.code));

      const {
        checkIn,
        checkOut,
        from,
        to,
        adults = 2,
        children = 1,
      } = req.body.params;

      const stay = {
        checkIn,
        checkOut,
      };

      const occupancies = [
        {
          rooms: 1,
          adults: 2,
          children: 0,
        },
      ];

      const requestBody = {
        stay,
        occupancies,
        hotels: { hotel: hotelIds },
      };

      const hotelResponse = await makeHotelApiRequest(
        "POST",
        "hotel-api/3.0/hotels",
        "",
        requestBody
      );

      const priceMap = {};
      hotelResponse.hotels.hotels.forEach((hotel) => {
        priceMap[hotel.code] = {
          minRate: hotel.minRate,
          maxRate: hotel.maxRate,
          currency: hotel.currency,
        };
      });

      const hotelsWithPrices = response.hotels.filter(
        (hotel) => priceMap[hotel.code]
      );

      const mergedHotels = hotelsWithPrices.map((hotel) => {
        const { code } = hotel;
        if (priceMap[code]) {
          return {
            ...hotel,
            minRate: priceMap[code].minRate,
            maxRate: priceMap[code].maxRate,
            currency: priceMap[code].currency,
          };
        }
        return hotel;
      });

      const { highest, lowest } = await getHighestAndLowestPrices(mergedHotels);

      const hotelMarkupPrice = await MarkupPriceService.getPrice("hotel");

      await ApiRequestLogService.create({
        request: req.body.params,
        response: mergedHotels,
        browserData: req.body.browserData,
        ip: ip,
        success_status: true,
        endpoint: "hotel search",
      });

      res.status(200).json({
        data: mergedHotels,
        searchCriteria: {
          minPrice: parseFloat(highest),
          maxPrice: parseFloat(lowest),
        },
        hotelMarkupPrice: 0,
      });
    } catch (error) {
      await ApiRequestLogService.create({
        request: req.body.params,
        response: JSON.stringify(error),
        browserData: req.body.browserData,
        ip: ip,
        success_status: false,
        endpoint: "hotel search",
      });
      await sendErrorNotificationEmail(
        "",

        error,
        "",
        "Hotel search API Error"
      );
      res.status(500).json({ error: error });
    }
  }

  async getHotelContent(req, res) {
    // try {
    const params = `hotel-content-api/1.0/hotels/${req.params.id}/details`;
    const response = await makeHotelApiRequest("GET", params);

    console.log(response);

    // const { checkIn, checkOut, from, to, adults, rooms, children } = req.body;
    // const stay = {
    //   checkIn,
    //   checkOut,
    // };

    // const occupancies = [
    //   {
    //     rooms: rooms,
    //     adults: adults,
    //     children: children,
    //   },
    // ];

    // const requestBody = {
    //   // stay,
    //   // occupancies,
    //   hotels: { hotel: [req.params.id] },
    // };

    // const hotelResponse = await makeHotelApiRequest(
    //   "POST",
    //   "hotel-api/3.0/hotels",
    //   "",
    //   requestBody
    // );
    // const finalResponse = {
    //   response: response,
    //   priceResponse: hotelResponse,
    // };

    // res.status(200).json({ data: finalResponse });
    // } catch (error) {
    //   await sendErrorNotificationEmail(
    //     "",

    //     error,
    //     error.response.data,
    //     "Hotel get API Error"
    //   );
    //   res.status(500).json({ error: error });
    // }
  }

  async searchCountries(req, res) {
    try {
      // Extract query parameters from the request
      const { fields, language, from, to, codes } = req.query;

      // Construct the full URL with query parameters
      const queryParams = new URLSearchParams({
        fields: fields || "all",
        language: language || "ENG",
        from: from || 1,
        to: to || 203,
        codes: codes || "LK",
      }).toString();

      // Make API request using makeHotelApiRequest
      const response = await makeHotelApiRequest(
        "GET",
        `hotel-content-api/1.0/locations/destinations?${queryParams}`, // Append query parameters directly to the URL
        {}, // No body needed
        {} // No request body
      );

      // Send the response back to the client
      res.status(200).json(response);
    } catch (error) {
      // Handle errors
      await sendErrorNotificationEmail(
        "",
        error,
        error.response?.data || "No response data",
        "Country get API Error"
      );
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new HotelSearchController();
