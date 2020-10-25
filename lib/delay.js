const range = require('lodash/range')

function delay(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

async function delayMiddleware(request, response, next) {
  const _delay = Number(request.query._delay)

  if (range(1, 11).includes(_delay)) {
    await delay(_delay)
  }

  return next()
}

module.exports = delayMiddleware
