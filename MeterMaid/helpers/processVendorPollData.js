// Right now we're focused on Honeywell but the goal is to support multiple vendors
const processHoneywellPollData = require('../utils/processHoneywellPollData')

function processVendorPollData (vendor, pollData) {
  if (vendor === 'Honeywell') {
    let processPromise = processHoneywellPollData(pollData)
    return processPromise
  }
}

module.exports = processVendorPollData
