function checkLocationHours (site) {
  // Check the DB to see if the user has established LocationHours.  Default the isOpenDuringPoll the Reading to false, it may be overwritten later.

  console.log('checkLocationHours')

  var dbPromise = new Promise(function (resolve, reject) {
    var checkLocationHoursSQL = `SELECT * from LocationHours WHERE locationId = ${
      site.LocationData.LocationID
    };`

    dbConnection.query(checkLocationHoursSQL, function (err, results) {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        location.ThermostatReadingData.isOpenDuringPoll = false
        if (results.length > 0) {
          // locationHours exist!
          site.LocationData.hasLocationHours = true
          resolve(true)
        } else {
          site.LocationData.hasLocationHours = false
          resolve(false) // no locationHours found
        }
      }
    })
  }).catch(err => {
    console.log(err)
  })
  return dbPromise
}

module.exports = checkLocationHours
