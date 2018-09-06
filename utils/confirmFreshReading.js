function confirmFreshReading (site) {
  // Find readings for this thermostat with the same datatimestamp...
  // Apply the 3 strikes rule....
  // Create an Activity for a "LostConnection" if 3 or more found...
  // TODO:  Can optimize this code by using an array of promises on the outside...will allow parallel units of work.  Right now we are serializing.

  // some shortcut vars.....
  let sT = site.ThermostatData
  let sR = site.ThermostatReadingData

  var dbPromise = new Promise(function (resolve, reject) {
    var freshReadingSQL = `SELECT thermostatId, COUNT(*) as readingsCount FROM Readings WHERE thermostatId = ${
      sT.ThermostatID
    } AND thermCreated = '${sR.Created}';`

    dbConnection.query(freshReadingSQL, function (err, results) {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        console.log(results)
        console.log(`results[0].readingsCount: ${results[0].readingsCount}`)
        if (results[0].readingsCount >= 3) {
          // 3 strikes rule!
          createLostConnectionActivity(site, results[0].readingsCount).then(
            () => {
              resolve(false)
            }
          )
        } else {
          resolve(true)
        }
      }
    }) // dbConnection.query
  }) // dbPromise
    .catch(err => {
      console.log(err)
    }) // dbPromise

  return dbPromise
} // confirmFreshReading

module.exports = confirmFreshReading
