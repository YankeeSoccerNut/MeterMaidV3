// Right now we're focused on Honeywell but the goal is to support multiple vendors
const HoneywellMeterManager = require('./HoneywellMeterManager')

function getVendorMeterManager (user) {
  if (user.vendor === 'Honeywell') {
    return new HoneywellMeterManager()
  }
}

module.exports = getVendorMeterManager
