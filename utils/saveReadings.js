const translateHoneywellValues = require('./translateHoneywellValues')
const confirmFreshReading = require('./confirmFreshReading')

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

        var insertReadingsSQL = `INSERT INTO readings (thermostat_id, therm_created_at, therm_is_locked,
          disp_temp, heat_set_point, cool_set_point, display_units, status_heat, status_cool,
          heat_lower_set_pt, heat_upper_set_pt, cool_lower_set_pt, cool_upper_set_pt, sched_heat_sp,
          sched_cool_sp, system_switch_pos, equipment_status, fan_position, fan_is_running, weather_is_defined,
          weather_is_valid, weather_temp, weather_temp_unit, weather_condition, has_operating_hours,
          therm_created_day, therm_created_hour, therm_created_min, trigger_id)  VALUES (${
  sT.ThermostatID
}, '${sR.Created}', ${sR.thermLocked}, ${sR.DispTemperature}, ${
  sR.HeatSetpoint
}, ${sR.CoolSetpoint},'${sR.DisplayedUnits}', ${sR.StatusHeat}, ${
  sR.StatusCool
}, ${sR.HeatLowerSetptLimit}, ${sR.HeatUpperSetptLimit}, ${
  sR.CoolLowerSetptLimit
}, ${sR.CoolUpperSetptLimit}, ${sR.SchedHeatSp},${sR.SchedCoolSp},
    ${sR.SystemSwitchPosition}, '${sT.EquipmentStatus}', '${
  sT.Fan[0].Position
}', ${sR.fanRunning}, ${sR.weatherIsDefined}, ${sR.weatherIsValid}, ${
  sL.CurrentWeather[0].Temperature
}, '${sL.CurrentWeather[0].TempUnit}', '${
  sL.CurrentWeather[0].Condition
}',
    ${sR.isOpenDuringPoll}, ${sR.thermCreatedDay}, ${sR.thermCreatedHour}, ${
  sR.thermCreatedMin
}, ${sR.triggerId});`

        console.log('inserting reading.....SQL:  ', insertReadingsSQL)

        global.meterMiserDBClient.query(insertReadingsSQL, function (
          err,
          result
        ) {
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
