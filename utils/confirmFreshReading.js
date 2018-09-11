const createLostConnectionActivity = require('./createLostConnectionActivity')

async function confirmFreshReading (site) {
  // Find readings for this thermostat with the same datatimestamp...
  // Apply the 3 strikes rule....
  // Create an Activity for a "LostConnection" if 3 or more found...
  // TODO:  Can optimize this code by using an array of promises on the outside...will allow parallel units of work.  Right now we are serializing.

  // some shortcut vars.....
  let sT = site.ThermostatData
  let sR = site.ThermostatReadingData

  try {
    const freshReadingSQL = `SELECT thermostat_id, COUNT(*) as readings_count FROM readings WHERE thermostat_id = ${
      sT.ThermostatID
    } AND therm_created_at = '${sR.Created}' GROUP BY thermostat_id;`

    console.log('freshReadingSQL: \n', freshReadingSQL)

    let results = await global.meterMiserDBClient.query(freshReadingSQL)
    console.log('confirmFreshReadingSQL results\n', results)

    if (results[0].readings_count >= 3) {
      // 3 strikes rule!
      await createLostConnectionActivity(site, results[0].readings_count)
      return false
    } else {
      return true
    }
  } catch (error) {
    console.log('an error has occurred...', error)
  }

  // var dbPromise = new Promise(function (resolve, reject) {
  //   const freshReadingSQL = `SELECT thermostat_id, COUNT(*) as readingsCount FROM readings WHERE thermostat_id = ${
  //     sT.ThermostatID
  //   } AND therm_created_at = '${sR.Created} GROUP BY thermostat_id';`

  //   console.log('freshReadingsSQL:\n', freshReadingSQL)

  //   global.meterMiserDBClient.query(freshReadingSQL, function (err, results) {
  //     if (err) {
  //       console.log(err)
  //       reject(err)
  //     } else {
  //       console.log(results)
  //       console.log(`results[0].readingsCount: ${results[0].readingsCount}`)
  //       if (results[0].readingsCount >= 3) {
  //         // 3 strikes rule!
  //         createLostConnectionActivity(site, results[0].readingsCount).then(
  //           () => {
  //             resolve(false)
  //           }
  //         )
  //       } else {
  //         resolve(true)
  //       }
  //     }
  //   }) // global.meterMiserDBClient.query
  // }) // dbPromise
  //   .catch(err => {
  //     console.log(err)
  //   }) // dbPromise

  // return dbPromise
} // confirmFreshReading

module.exports = confirmFreshReading
