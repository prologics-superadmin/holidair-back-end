async function getLastDepartureDate(flightData) {
  try {
    if (!flightData || !flightData.airSolutions) {
      return null; // Return null if no valid flight data exists
    }

    let lastArrivalDate = null;

    // Iterate over all airSolutions
    flightData.airSolutions.forEach((solution) => {
      if (solution.journey) {
        // Iterate over all journeys in the solution
        solution.journey.forEach((journey) => {
          if (journey.airSegments) {
            // Iterate over all airSegments in the journey
            journey.airSegments.forEach((segment) => {
              const arrivalDate = segment.arrivalDate;

              // Update lastArrivalDate if it's later than the current one
              if (
                arrivalDate &&
                (!lastArrivalDate ||
                  new Date(arrivalDate) > new Date(lastArrivalDate))
              ) {
                lastArrivalDate = arrivalDate;
              }
            });
          }
        });
      }
    });

    if (lastArrivalDate) {
      const dateObject = new Date(lastArrivalDate);
      return {
        date: dateObject.toISOString().split("T")[0],
      }; // Format as YYYY-MM-DD
    }
  } catch (error) {
    return "";
  }
}

module.exports = getLastDepartureDate;
