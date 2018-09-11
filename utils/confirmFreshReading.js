const createLostConnectionActivity = require('./createLostConnectionActivity')

async function confirmFreshReading (site) {
  // Find readings for this thermostat with the same datatimestamp...
  // Apply the 3 strikes rule....
  // Create an Activity for a "LostConnection" if 3 or more found...
  // TODO:  Can optimize this code by using an array of promises on the outside...will allow parallel units of work.  Right now we are serializing.

  // some abbreviations.....
  let sT = site.ThermostatData
  let sR = site.ThermostatReadingData

  try {
    const freshReadingSQL = `SELECT thermostat_id, COUNT(*) as readings_count
     FROM readings WHERE thermostat_id = ${sT.ThermostatID} 
     AND therm_created_at = '${sR.Created}' GROUP BY thermostat_id;`

    let results = await global.meterMiserDBClient.query(freshReadingSQL)

    if (results.rowCount && results.rows[0].readings_count >= 3) {
      // 3 strikes rule!
      await createLostConnectionActivity(site, results.rows[0].readings_count)
      return false
    } else {
      return true
    }
  } catch (error) {
    console.log('an error has occurred...', error)
  }
}

module.exports = confirmFreshReading
