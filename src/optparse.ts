const minimist = require('minimist')

function optparse(argv) {
  return minimist(argv, {
    alias: {
      w: 'watch',
      p: 'port'
    },
    default: {
      w: true,
      p: 4567
    }
  })
}

module.exports = optparse
