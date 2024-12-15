async function getLastArrivalTime(flightData) {
  if (!flightData || !flightData.airSolutions) {
    return null; // Return null if no valid flight data exists
  }

  let lastArrivalTime = null;

  // Iterate over all flight solutions
  flightData.forEach((solution) => {
    if (solution.journey) {
      // Iterate over all journeys in the solution
      solution.journey.forEach((journey) => {
        if (journey.airSegments) {
          // Iterate over all airSegments in the journey
          journey.airSegments.forEach((segment) => {
            const arrivalTime = segment.arrivalTime;

            // Update lastArrivalTime if it's later than the current one
            if (
              arrivalTime &&
              (!lastArrivalTime ||
                new Date(`1970-01-01T${arrivalTime}Z`) >
                  new Date(`1970-01-01T${lastArrivalTime}Z`))
            ) {
              lastArrivalTime = arrivalTime;
            }
          });
        }
      });
    }
  });

  return lastArrivalTime;
}

module.exports = getLastArrivalTime;
