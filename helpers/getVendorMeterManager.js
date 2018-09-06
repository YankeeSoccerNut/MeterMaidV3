// Right now we're focused on Honeywell but the goal is to support multiple vendors
// Is there a way to standardarize the methods and use Proxy to execute the vendor-specific API
const HoneywellMeterManager = require('./HoneywellMeterManager')

function getVendorMeterManager (user) {
  if (user.vendor === 'Honeywell') {
    return new HoneywellMeterManager()
  }
}

module.exports = getVendorMeterManager
