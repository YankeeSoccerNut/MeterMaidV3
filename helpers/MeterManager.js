// Right now we're focused on Honeywell but the goal is to support multiple vendors
// Is there a way to standardarize the methods and use Proxy to execute the vendor-specific API
const HoneywellMeterManager = require('../helpers/HoneywellMeterManager')

class MeterManager {
  openConnection (user) {
    console.log('openConnection for ', user)
  }

  pollMeters (connectionID) {
    console.log('pollMeters for ', connectionID)
  }
  issueCommand (meter) {
    console.log('issueCommand for ', meter)
  }

  closeConnection (connectionID) {
    console.log('closeConnection for ', connectionID)
  }
}

module.exports = MeterManager
