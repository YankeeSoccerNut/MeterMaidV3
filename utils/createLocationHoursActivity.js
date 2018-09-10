const createActivity = require('./createActivity')
const activityObj = require('./activityObj')

function createLocationHoursActivity (site) {
  console.log('createLocationHoursActivity')
  // Use a utility function here to insert into the ActivityLog table....
  activityObj.locationId = site.LocationData.LocationID
  activityObj.triggerId = 1
  site.ThermostatReadingData.triggerId = activityObj.triggerId
  activityObj.message = 'From meterMaid:  No LocationHours';

  let dbPromise = createActivity(dbConnection, activityObj)

  return dbPromise
}

module.exports = createLocationHoursActivity
