function getLastDepartureDate(journey) {
  try {
    if (journey.length === 0) return "";
    const lastJourney = journey[journey.length - 1];
    const date = lastJourney.arrivalDatetime.split(" ");
    const [day, month, year] = date[0].split("/");
    return {
      date: `${year}-${month}-${day}`,
      time: date[1],
    };
  } catch (error) {
    return "";
  }
}

module.exports = getLastDepartureDate;
