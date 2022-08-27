const nodemon = require('nodemon')
const script = `${__dirname}/server.js`

function shutdown() {
  console.log('\0')
  process.exit()
}

module.exports = {
  file: script,
  watch(...args) {
    nodemon({ watch: args, script })
      .on('quit', () => shutdown())
  }
}
