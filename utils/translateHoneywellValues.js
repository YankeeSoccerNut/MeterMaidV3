function translateHoneywellValues (site) {
  console.log('translateHoneywellValues')
  const moment = require('moment')

  // Some values need to be evaluated and translated...do that here
  // some shortcut vars.....
  let sL = site.LocationData
  let sT = site.ThermostatData
  let sR = site.ThermostatReadingData
  // parsing out and storing the datetime into different components provides a lot of flexibility later on...
  var mDate = moment(sR.Created, moment.ISO_8601)
  sR.thermCreatedDay = mDate.day()
  sR.thermCreatedHour = mDate.hour()
  sR.thermCreatedMin = mDate.minute()

  if (sT.UI[0].ThermostatLocked == 'true') {
    sR.thermLocked = true
  } else {
    sR.thermLocked = false
  }

  if (sT.Fan[0].IsFanRunning == 'true') {
    sR.fanRunning = true
  } else {
    sR.fanRunning = false
  }

  if (sT.Fan[0].CanSetOn == 'true') {
    sR.fanCanSetOn = true
  } else {
    sR.fanCanSetOn = false
  }

  if (sL.CurrentWeather[0].IsDefined == 'true') {
    sR.weatherIsDefined = true
  } else {
    sR.weatherIsDefined = false
  }

  if (sL.CurrentWeather[0].IsValid == 'true') {
    sR.weatherIsValid = true
  } else {
    sR.weatherIsValid = false
  }
} // translateHoneywellValues

module.exports = translateHoneywellValues
