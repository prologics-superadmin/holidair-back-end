const errorNotificationMail = require("../mail/error-notification");
const sendMail = require("../mail/mail");

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

async function sendErrorNotificationEmail(subject, message, error, errorType) {
  try {
    await sendMail(
      [
        // "nayana@prologics.lk",
        // "sujith@holidayair.com",
        // "harsha@prologics.lk",
        "nayanadarshana1@gmail.com",
      ],
      "",
      "API Error ALERT",
      errorNotificationMail({
        errorType: errorType,
        message: message,
        stack: error,
        timestamp: new Date().toISOString(),
      })
    );
  } catch (error) {
    console.log(error);
    return "";
  }
}

async function getClientIp(req) {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.log(error);
    return "";
  }
}

module.exports = getLastDepartureDate;
module.exports = sendErrorNotificationEmail;
module.exports = getClientIp;
