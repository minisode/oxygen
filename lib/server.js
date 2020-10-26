const asyncHandler = require('express-async-handler')
const express = require('express')
const morgan = require('morgan')
const range = require('lodash/range')
const { getConfiguration } = require('./helpers')
const { generate } = require('./generate')
const status = require('./status')
const delay = require('./delay')
const PORT = process.env.PORT || 4567
const server = express()

server.use(morgan('dev'))
server.use(asyncHandler(delay))
server.use(asyncHandler(status))

getConfiguration().then(configuration => {
  for (let route of Object.keys(configuration)) {
    const [methods, path] = route.split(/\s+/)
    const { data } = configuration[route]

    async function handler(request, response) {
      const _total = Number(request.query._total)
      const _data = range(0, 16).includes(_total)
        ? range(_total).map(_ => generate(data))
        : generate(data)

      return response.json(_data)
    }

    for (let method of methods.toLowerCase().split('/')) {
      server[method](path, asyncHandler(handler))
    }
  }

  server.listen(PORT, () => {
    console.log(`* Listening on http://localhost:${PORT}`)
    console.log('* Use Ctrl-C to stop')
  })
})
