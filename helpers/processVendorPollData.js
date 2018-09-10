const processHoneywellPollData = require('../utils/processHoneywellPollData')

function processVendorPollData (vendor, pollData) {
  if (vendor === 'Honeywell') {
    return processHoneywellPollData(pollData)
  }
}

module.exports = processVendorPollData
