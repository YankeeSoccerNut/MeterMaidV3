const translateHoneywellValues = require('./translateHoneywellValues')

function saveReadings (site) {
  console.log('saveReadingsProcess')

  translateHoneywellValues(site)

  var dbPromise = new Promise(function (resolve, reject) {
    confirmFreshReading(site)
      .then(() => {
        // some shortcut vars.....
        var sL = site.LocationData
        var sT = site.ThermostatData
        var sR = site.ThermostatReadingData

        var insertReadingsSQL = `INSERT INTO Readings (thermostatId,thermCreated,thermLocked,dispTemp,heatSetPoint,coolSetPoint,displayUnits,statusHeat,statusCool,heatLowerSetPt,heatUpperSetPt,coolLowerSetPt,coolUpperSetPt,schedHeatSp,schedCoolSp,systemSwitchPos,equipmentStatus,fanPosition,fanRunning,weatherIsDefined,weatherIsValid,weatherTemp,weatherTempUnit,weatherCondition,operatingHoursFlag,thermCreatedDay, thermCreatedHour, thermCreatedMin, triggerId)  VALUES (${
          sT.ThermostatID
        }, "${sR.Created}", ${sR.thermLocked}, ${sR.DispTemperature}, ${
          sR.HeatSetpoint
        }, ${sR.CoolSetpoint},"${sR.DisplayedUnits}", ${sR.StatusHeat}, ${
          sR.StatusCool
        }, ${sR.HeatLowerSetptLimit}, ${sR.HeatUpperSetptLimit}, ${
          sR.CoolLowerSetptLimit
        }, ${sR.CoolUpperSetptLimit}, ${sR.SchedHeatSp},${sR.SchedCoolSp},
    ${sR.SystemSwitchPosition}, "${sT.EquipmentStatus}", "${
  sT.Fan[0].Position
}", ${sR.fanRunning}, ${sR.weatherIsDefined}, ${sR.weatherIsValid}, ${
  sL.CurrentWeather[0].Temperature
}, "${sL.CurrentWeather[0].TempUnit}", "${
  sL.CurrentWeather[0].Condition
}",
    ${sR.isOpenDuringPoll}, ${sR.thermCreatedDay}, ${sR.thermCreatedHour}, ${
  sR.thermCreatedMin
}, ${sR.triggerId});`

        dbConnection.query(insertReadingsSQL, function (err, result) {
          if (err) {
            reject(err)
          } else {
            console.log('Reading record inserted')
            resolve(result)
          }
        }) //query
      })
      .catch(err => {
        console.log(err)
      })
  }).catch(err => {
    console.log(err)
  })

  return dbPromise
} // saveReadingsProcess

module.exports = saveReadings
