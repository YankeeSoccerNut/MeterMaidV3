function createLostConnectionActivity (site, count) {
  console.log('createLostConnectionActivity')
  // Use a utility function here to insert into the ActivityLog table....
  activityObj.locationId = site.LocationData.LocationID
  activityObj.triggerId = 2 // LostConnection
  site.ThermostatReadingData.triggerId = activityObj.triggerId
  activityObj.message = `From meterMaid:  Lost connection? No change in  ${count} polls`

  let dbPromise = createActivity(dbConnection, activityObj) // createActivity returns a promise

  return dbPromise
} // createLostConnectionActivity

module.exports = createLostConnectionActivity
