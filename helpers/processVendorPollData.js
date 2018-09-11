const processHoneywellPollData = require('../utils/processHoneywellPollData')

function processVendorPollData (vendor, pollData) {
  if (vendor === 'Honeywell') {
    let processPromise = processHoneywellPollData(pollData)
    return processPromise
  }
}

module.exports = processVendorPollData
