const moment = require('moment')

async function checkIsOpenDuringPoll (site) {
  const mDate = moment(site.ThermostatReadingData.Created, moment.ISO_8601)
  const dayOfWeek = mDate.day()
  const hour = mDate.hour()
  const minute = mDate.minute()

  const militaryTime = hour * 100 + minute

  const checkOpenSQL = `SELECT * FROM LocationHours WHERE locationId = ${
    site.LocationData.LocationID
  } AND dayOfWeek = ${dayOfWeek} AND ((${militaryTime} >= openHour) AND (${militaryTime} <= closeHour));`

  try {
    let results = await global.meterMiserDBClient.query(checkOpenSQL)
    if (results.rowCount) {
      // Found match..open!
      console.log(`${site.LocationData.LocationID} is OPEN`)
      site.ThermostatReadingData.isOpenDuringPoll = true
      return true
    }
    console.log(`${site.LocationData.LocationID} is CLOSED`)
    site.ThermostatReadingData.isOpenDuringPoll = false
    return false // No match....closed!
  } catch (error) {
    console.log('an error has occurred: ', error)
  }
}

module.exports = checkIsOpenDuringPoll
