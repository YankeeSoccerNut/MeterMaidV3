async function checkLocationHours (location) {
  // Check the DB to see if the user has established LocationHours.  Default the isOpenDuringPoll the Reading to false, it may be overwritten later.

  console.log('checkLocationHours...')

  const checkLocationHoursSQL = `SELECT * from location_hours WHERE location_id = ${
    location.LocationData.LocationID
  };`

  try {
    let results = await global.meterMiserDBClient.query(checkLocationHoursSQL)
    if (results.rowCount) {
      return true
    }
    return false
  } catch (error) {
    console.log('an error has occurred: ', error)
  }
}

module.exports = checkLocationHours
