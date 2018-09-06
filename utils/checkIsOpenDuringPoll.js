function checkIsOpenDuringPoll (site) {
  console.log('checkIsOpenDuringPoll')

  const moment = require('moment')

  const mDate = moment(site.ThermostatReadingData.Created, moment.ISO_8601)
  const dayOfWeek = mDate.day()
  const hour = mDate.hour()
  const minute = mDate.minute()

  const militaryTime = hour * 100 + minute

  let dbPromise = new Promise(function (resolve, reject) {
    const checkOpenSQL = `SELECT * FROM LocationHours WHERE locationId = ${
      site.LocationData.LocationID
    } AND dayOfWeek = ${dayOfWeek} AND ((${militaryTime} >= openHour) AND (${militaryTime} <= closeHour));`

    dbConnection.query(checkOpenSQL, function (err, results) {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        if (results.length > 0) {
          // Found match..open!
          console.log(`${site.LocationData.LocationID} is OPEN`)
          site.ThermostatReadingData.isOpenDuringPoll = true
          resolve(true)
        } else {
          console.log(`${site.LocationData.LocationID} is CLOSED`)
          site.ThermostatReadingData.isOpenDuringPoll = false
          resolve(false) // No match....closed!
        }
      }
    })
  }).catch(err => {
    console.log(err)
  })
  return dbPromise
}

module.exports = checkIsOpenDuringPoll
