
async function getHighestAndLowestPrices(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return { highest: null, lowest: null };
  }

  let highest = arr[0].maxRate;
  let lowest = arr[0].maxRate;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i].maxRate > highest) {
      highest = arr[i].maxRate;
    }
    if (arr[i].maxRate < lowest) {
      lowest = arr[i].maxRate;
    }
  }

  return { highest, lowest };
}
async function getStopValues(arr) {
  const stopValues = new Set();

  arr.forEach((flight) => {
    flight.journey.forEach((j) => {
      stopValues.add(j.stop);
    });
  });

  return Array.from(stopValues);
}

async function getUniqueTotalFlightDurations(arr) {
  const totalFlightDurations = new Set();

  arr.forEach((flight) => {
    flight.journey.forEach((journey) => {
      journey.optionInfos.forEach((option) => {
        totalFlightDurations.add(option.totalFlightDuration);
      });
    });
  });

  return Array.from(totalFlightDurations);
}

async function getUniqueBaggageAllowances(arr) {
  const baggageAllowances = new Set();

  arr.forEach((flight) => {
    flight.journey.forEach((journey) => {
      journey.optionInfos.forEach((option) => {
        if (option.airSegmentInfos && option.airSegmentInfos.length > 0) {
          option.airSegmentInfos.forEach((segment) => {
            if (segment.baggageInfo && segment.baggageInfo.allowance) {
              baggageAllowances.add(segment.baggageInfo.allowance);
            }
          });
        }
      });
    });
  });

  return Array.from(baggageAllowances);
}

async function getUniqueAirports(arr) {
  const airportCodes = new Set();

  arr.forEach((flight) => {
    flight.journey.forEach((journey) => {
      journey.optionInfos.forEach((option) => {
        if (option.airSegmentInfos && option.airSegmentInfos.length > 0) {
          option.airSegmentInfos.forEach((segment) => {
            segment.airport.forEach((airport) => {
              airportCodes.add(airport.airportName);
            });
          });
        }
      });
    });
  });

  return Array.from(airportCodes);
}

async function getAirportCodes(data) {
  let origin = "";
  let finalDestination = "";

  if (data.length > 0) {
    // Get the journey (assumed to be one-way)
    const journey = data[0].journey[0];
    if (journey && journey.optionInfos.length > 0) {
      const airSegments = journey.optionInfos[0].airSegmentInfos;
      if (airSegments.length > 0) {
        origin = airSegments[0].origin;
        finalDestination = airSegments[airSegments.length - 1].destination;
      }
    }
  }

  return { origin, finalDestination };
}

exports.getHighestAndLowestPrices = getHighestAndLowestPrices;
exports.getStopValues = getStopValues;
exports.getUniqueTotalFlightDurations = getUniqueTotalFlightDurations;
exports.getUniqueBaggageAllowances = getUniqueBaggageAllowances;
exports.getUniqueAirports = getUniqueAirports;
exports.getAirportCodes = getAirportCodes;
