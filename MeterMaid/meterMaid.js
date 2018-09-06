// meterMaid is designed to poll Honeywell wifi thermostats for current settings and readings.
// It utilizes an older API to access the thermostats and their settings and readings in a database for later use.

// program structure....
// 1.  get the userid and password for logging into the Honeywell platform.  TODO:  implement mulit-user via the users credentials that we capture on the front-end.
// 2.  use the API to request all locations and current reading for each location.  The current Honeywell API returns XML so it gets transformed to JSON.
// 3.  Use the transformed JSON to process the poll results

const config = require('../config/config')
const getVendorMeterManager = require('../helpers/getVendorMeterManager')

const testUser = {
  vendor: 'Honeywell',
  uid: config.honeywellUID,
  password: config.honeywellPass
}
// import Sequelize from 'sequelize'
// const createActivity = require('../utils/createActivity')

// const dbConnection = mysql.createConnection(config.db)

async function main () {
  console.log('Start of processing....')

  try {
    const vendorMeterManager = getVendorMeterManager(testUser)
    const connectionID = await vendorMeterManager.openConnection(testUser)

    let pollResults = await vendorMeterManager.pollMeters(connectionID)
    console.log('pollResults: ', pollResults)

    vendorMeterManager.closeConnection(connectionID)

    // dbConnection.connect()
    // await processHoneywellPoll(pollResults)
    // console.log('dbConnection CLOSING!')
    // dbConnection.end()

    // console.log(pollResults)
  } catch (error) {
    console.log('an error has occurred...', error)
  }
}

main()

function processHoneywellPoll (poll) {
  // Poll data contains Location information for each site the user has registered with Honeywell.  There is also Thermostat and Reading data with each Poll.
  // Iterate through Locations, Thermostat, and Readings...
  // With each iteration:
  // 1.  Check to see if there are LocationHours in our DB.  These are used to determine if the Reading occurred during business hours or not.  This is a critical boolean value for the overall system.  // NOTE:  it would be cool to use Google Places info instead of our DB...Google Places provides insight to consumers about location, hours, etc.
  // 2.  If there are no LocationHours, create an Activity to remind the user that they need to define them in order to get value from the system.
  // 3.  Format a complete Reading record and INSERT it into our DB.

  var saveReadingsPromisesArray = []

  var pollFinishedPromise = new Promise(function (resolve, reject) {
    var readyToFormatPromise = null

    poll.map(site => {
      // console.log(site);
      checkLocationHours(site).then(hasLocationHours => {
        isOpenDuringPoll = false
        if (hasLocationHours) {
          readyToFormatPromise = checkIsOpenDuringPoll(site)
        } else {
          readyToFormatPromise = createLocationHoursActivity(site)
        }
        readyToFormatPromise.then(() => {
          saveReadingsPromisesArray.push(saveReadingsProcess(site))
          Promise.all(saveReadingsPromisesArray).then(() => {
            resolve(true)
          })
          console.log('***********PROMISES PROMISES***************')
          console.log(saveReadingsPromisesArray)
        }) // readyToFormatPromise.then
      }) //  checkLocationHours.then
    }) // poll.Map
    // Promise.all(saveReadingsPromisesArray).then(() => {
    //   resolve(true); // pollFinishedPromise
    // });
  }).catch(err => {
    console.log(err)
  })

  // Promise.all(saveReadingsPromisesArray).then(() => {
  //   resolve(true); // pollFinishedPromise
  // });

  return pollFinishedPromise
}
