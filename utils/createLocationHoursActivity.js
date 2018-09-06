const createActivity = require('./createActivity')

function createLocationHoursActivity (site) {
  console.log('createLocationHoursActivity')
  // Use a utility function here to insert into the ActivityLog table....
  activityObj.locationId = site.LocationData.LocationID
  activityObj.triggerId = 1 // NoLocationHours
  site.ThermostatReadingData.triggerId = activityObj.triggerId
  activityObj.message = 'From meterMaid:  No locationHours';

  var dbPromise = createActivity(dbConnection, activityObj) // createActivity returns a promise

  return dbPromise
} // createLocationHoursActivity

module.exports = createLocationHoursActivity
