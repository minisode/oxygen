import type { Request, Response, NextFunction } from 'express'

const statuses = [201, 204, 400, 401, 403, 404, 422]

export default async function statusMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const _status = Number(request.query._status)

  if (statuses.includes(_status)) {
    return response.sendStatus(_status)
  }

  return next()
}
