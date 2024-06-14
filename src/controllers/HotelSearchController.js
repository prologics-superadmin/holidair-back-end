const makeHotelApiRequest = require("../utils/hotelRequest");

class HotelSearchController {
  async searchHotels(req, res) {
    // try {
    const response = await makeHotelApiRequest(
      "GET",
      "/hotel-content-api/1.0/hotels",
      req.body,
      ""
    );
    const hotelIds = response.hotels.map((hotel) => parseInt(hotel.code));

    const { checkIn, checkOut, from, to, adults = 2, children = 1 } = req.body;

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

    // return res.status(200).json({ data: hotelResponse });

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

    res.status(200).json({ data: mergedHotels });
    // } catch (error) {
    //   res.status(500).json({ error: error });
    // }
  }

  async getHotelContent(req, res) {
    try {
      const params = `/hotel-content-api/1.0/hotels/${req.params.id}/details`;
      const response = await makeHotelApiRequest("GET", params, {});

      console.log(response);
      res.status(200).json({ data: response });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

module.exports = new HotelSearchController();
