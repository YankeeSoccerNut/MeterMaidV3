// meterMaid is designed to poll Honeywell wifi thermostats for current settings and readings.
// It utilizes an older API to access the thermostats and their settings and readings in a database for later use.

// program structure....
// 1.  get the userid and password for logging into the Honeywell platform.  TODO:  implement mulit-user via the users credentials that we capture on the front-end.
// 2.  use the API to request all locations and current reading for each location.  The current Honeywell API returns XML so it gets transformed to JSON.
// 3.  Use the transformed JSON to process the poll results

const config = require('../config/config')
const { Client } = require('pg')
const getVendorMeterManager = require('../helpers/getVendorMeterManager')
const processVendorPollData = require('../helpers/processVendorPollData')

global.meterMiserDBClient = new Client(config.db)

const testUser = {
  vendor: 'Honeywell',
  uid: config.honeywellUID,
  password: config.honeywellPass
}
// const createActivity = require('../utils/createActivity')

// const dbConnection = mysql.createConnection(config.db)

async function main () {
  console.log('Start of processing....')

  try {
    const vendorMeterManager = getVendorMeterManager(testUser)
    const connectionID = await vendorMeterManager.openConnection(testUser)

    let pollResults = await vendorMeterManager.pollMeters(connectionID)
    vendorMeterManager.closeConnection(connectionID)

    await global.meterMiserDBClient.connect()

    await processVendorPollData(testUser.vendor, pollResults)

    await global.meterMiserDBClient.end()
    console.log('database connection closed')
  } catch (error) {
    console.log('an error has occurred...', error)
  }
}

main()
