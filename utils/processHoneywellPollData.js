const checkLocationHours = require('./checkLocationHours')
const checkIsOpenDuringPoll = require('./checkIsOpenDuringPoll')
const createLocationHoursActivity = require('./createLocationHoursActivity')
const saveReadings = require('./saveReadings')

async function processHoneywellPollData (pollData) {
  // Poll data contains Location information for each location the user has registered with Honeywell.  There is also Thermostat and Reading data with each Poll.
  // Iterate through Locations, Thermostat, and Readings...
  // With each iteration:
  // 1.  Check to see if there are LocationHours in our DB.  These are used to determine if the Reading occurred during business hours or not.  This is a critical boolean value for the overall system.  // NOTE:  it would be cool to use Google Places info instead of our DB...Google Places provides insight to consumers about location, hours, etc.
  // 2.  If there are no LocationHours, create an Activity to remind the user that they need to define them in order to get value from the system.
  // 3.  Format a complete Reading record and INSERT it into our DB.

  let saveReadingsPromisesArray = []

  let readyToSaveReading = null
  let hasLocationHours = null

  // here's a case where map won't work because it creates a function scope where
  // await CANNOT be used.  for loop is a code block within the broader function so
  // await CAN be used
  for (const site of pollData) {
    hasLocationHours = await checkLocationHours(site)
    if (hasLocationHours) {
      site.LocationData.hasOperatingHours = true
      readyToSaveReading = await checkIsOpenDuringPoll(site)
    } else {
      site.LocationData.hasOperatingHours = false
      readyToSaveReading = await createLocationHoursActivity(site)
    }
    if (readyToSaveReading) {
      saveReadingsPromisesArray.push(saveReadings(site))
    }
  }

  await Promise.all(saveReadingsPromisesArray)
}

module.exports = processHoneywellPollData
