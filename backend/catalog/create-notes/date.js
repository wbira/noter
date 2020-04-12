
const addDays = (days) => {
  return new Date(Date.now() + 864e5 * days);
}

exports.convertDaysToEpoch = (days) => {
  return Math.floor(addDays(days).getTime() / 1000)
}

exports.validExpirationDays = (expirationDays) => {
  return expirationDays && Number.isInteger(Number(expirationDays))
}