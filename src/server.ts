import asyncHandler from 'express-async-handler'
import express from 'express'
import morgan from 'morgan'
import range from 'lodash/range'
import status from './middlewares/status'
import delay from './middlewares/delay'
import { generate } from './generate'
import { getConfiguration } from './helpers'

const PORT = process.env.PORT || 4567
const server = express()

server.use(morgan('dev'))
server.use(asyncHandler(delay))
server.use(asyncHandler(status))

const configuration = getConfiguration()

for (let route of Object.keys(configuration)) {
  const [methods, path] = route.split(/\s+/)
  const { data } = configuration[route]

  async function handler(request, response) {
    const _total = Number(request.query._total)
    const _data = range(0, 16).includes(_total)
      ? range(_total).map((_) => generate(data))
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
