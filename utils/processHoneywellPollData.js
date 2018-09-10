const checkLocationHours = require('./checkLocationHours')
const checkIsOpenDuringPoll = require('./checkIsOpenDuringPoll')
const createLocationHoursActivity = require('./createLocationHoursActivity')
const saveReadings = require('./saveReadings')

function processHoneywellPollData (pollData) {
  // Poll data contains Location information for each site the user has registered with Honeywell.  There is also Thermostat and Reading data with each Poll.
  // Iterate through Locations, Thermostat, and Readings...
  // With each iteration:
  // 1.  Check to see if there are LocationHours in our DB.  These are used to determine if the Reading occurred during business hours or not.  This is a critical boolean value for the overall system.  // NOTE:  it would be cool to use Google Places info instead of our DB...Google Places provides insight to consumers about location, hours, etc.
  // 2.  If there are no LocationHours, create an Activity to remind the user that they need to define them in order to get value from the system.
  // 3.  Format a complete Reading record and INSERT it into our DB.

  let saveReadingsPromisesArray = []

  let pollFinishedPromise = new Promise(function (resolve, reject) {
    let readyToFormatPromise = null

    pollData.map(site => {
      console.log(site)
      // checkLocationHours(site).then(hasLocationHours => {
      //   if (hasLocationHours) {
      //     readyToFormatPromise = checkIsOpenDuringPoll(site)
      //   } else {
      //     readyToFormatPromise = createLocationHoursActivity(site)
      //   }
      //   readyToFormatPromise.then(() => {
      //     saveReadingsPromisesArray.push(saveReadings(site))
      //     Promise.all(saveReadingsPromisesArray).then(() => {
      //       resolve(true)
      //     })
      //     console.log('***********PROMISES PROMISES***************')
      //     console.log(saveReadingsPromisesArray)
      //   }) // readyToFormatPromise.then
      // }) //  checkLocationHours.then
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

module.exports = processHoneywellPollData
