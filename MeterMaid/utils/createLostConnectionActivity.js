const activityObj = require('./activityObj')
const createActivity = require('./createActivity')

function createLostConnectionActivity (site, count) {
  console.log('createLostConnectionActivity')
  activityObj.locationId = site.LocationData.LocationID
  activityObj.triggerId = 2 // LostConnection
  site.ThermostatReadingData.triggerId = activityObj.triggerId
  activityObj.message = `From meterMaid:  Lost connection? No change in  ${count} polls`

  let dbPromise = createActivity(activityObj)
  return dbPromise
}

module.exports = createLostConnectionActivity
