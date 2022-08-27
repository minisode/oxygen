import type { Request, Response, NextFunction } from 'express'
import range from 'lodash/range'

function delay(seconds: number = 1) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}

export default async function delayMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const _delay = Number(request.query._delay)

  if (range(1, 11).includes(_delay)) {
    await delay(_delay)
  }

  return next()
}
