const exec = require('child_process').exec
const parseString = require('xml2js').parseString

class HoneywellMeterManager {
  async openConnection (email, password) {
    // Get user id and password.....// TODO: encrypt/decrypt for security
    // Now format then make the request for a sessionId....using curl
    // alternate version had to format this way to avoid having OS interpret the & as 'run in background'

    let curlRequest = `curl -s -k -X 'POST' -H 'Content-Type: application/x-www-form-urlencoded' -H 'User-Agent: Apache-HttpClient/UNAVAILABLE (java 1.4)' \
        'https://tccna.honeywell.com/ws/MobileV2.asmx/AuthenticateUserLogin' \
    -d applicationID=a0c7a795-ff44-4bcd-9a99-420fac57ff04 \
    -d ApplicationVersion=2 \
    -d Username=${email} \
    -d UiLanguage=English \
    -d Password=${password}`

    const sessionID = await new Promise(function (resolve, reject) {
      // need to ask the OS to exec the curl command for us...
      exec(curlRequest, (error, xmlResponse, errorResponse) => {
        console.log('session xmlResponse: ' + xmlResponse)
        console.log('errorResponse: ' + errorResponse)

        if (error !== null) {
          console.log('exec error', error)
          reject(error)
        }

        parseString(xmlResponse, (error, result) => {
          if (error) {
            console.log('error: ', error)
            reject(error)
          }

          resolve(result.AuthenticateLoginResult.SessionID)
        })
      })
    })
    return sessionID
  }

  _transformPollResults (xmlResponse) {
    // Transform the xml response to JSON
    let locationsPoll = []
    let theLocationsData = null
    let theThermostatsData = null
    let theThermostatReadingsData = null

    parseString(xmlResponse, function (error, results) {
      if (error !== null) {
        // TODO: beef up error checking...
        console.log(error)
      }

      for (
        let i = 0;
        i < results.GetLocationsResult.Locations[0].LocationInfo.length;
        i++
      ) {
        theLocationsData =
          results.GetLocationsResult.Locations[0].LocationInfo[i]
        theThermostatsData =
          results.GetLocationsResult.Locations[0].LocationInfo[i].Thermostats[0]
            .ThermostatInfo[0]
        theThermostatReadingsData =
          results.GetLocationsResult.Locations[0].LocationInfo[i].Thermostats[0]
            .ThermostatInfo[0].UI[0]
        locationsPoll.push({
          LocationData: theLocationsData,
          ThermostatData: theThermostatsData,
          ThermostatReadingData: theThermostatReadingsData
        })
      }
    })
    return locationsPoll
  }

  async pollMeters (sessionID) {
    // need to ask the OS to exec the curl command for us...
    // Now use the sessionID to poll this user's account and get readings for all thermostats....
    const curlRequest = `curl -H "Accept: application/xml" -H "Content-Type: application/xml" -X GET 'https://tccna.honeywell.com//ws/MobileV2.asmx/GetLocations?sessionID=${sessionID}'`

    const xmlPollResponse = await new Promise(function (resolve, reject) {
      exec(curlRequest, function (error, xmlResponse, errorResponse) {
        if (error !== null) {
          console.log('exec error: ' + errorResponse)
          reject(error)
        }
        resolve(xmlResponse)
      })
    })

    return this._transformPollResults(xmlPollResponse)
  }

  closeConnection () {
    // need to ask the OS to exec the curl command for us...
    // logoff the session with Honeywell...
    const curlRequest = `curl -H "Accept: application/xml" -H "Content-Type: application/xml" -X GET 'https://tccna.honeywell.com//ws/MobileV2.asmx/LogOff?sessionID=${sessionID}'`

    exec(curlRequest, function (error, xmlResponse, errorResponse) {
      if (error !== null) {
        console.log('exec error: ' + errorResponse)
        return error
      }
      console.log('closed Honeywell connection')
    })
  }
}

module.exports = HoneywellMeterManager
