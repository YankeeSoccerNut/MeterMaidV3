function createActivity (activityObj) {
  const insertSQL = `INSERT INTO activity_log (status, location_id, trigger_id, message) VALUES (0, ${
    activityObj.locationId
  }, ${activityObj.triggerId}, '${activityObj.message}');`

  let dbPromise = new Promise(function (resolve, reject) {
    global.meterMiserDBClient.query(insertSQL, function (err, result) {
      if (err) {
        reject(err)
      } else {
        console.log('activity_log record inserted')
        resolve(result)
      }
    })
  }).catch(err => {
    console.log(err)
  })
  return dbPromise
}

module.exports = createActivity
