import start from 'nodemon'
const script = `${__dirname}/server.js`

function shutdown() {
  console.log('\0')
  process.exit()
}

export const nodemon = {
  file: script,
  watch(...args) {
    start({ watch: args, script }).on('quit', () => shutdown())
  }
}
