const statuses = [201, 204, 400, 401, 403, 404, 422]

async function statusMiddleware(request, response, next) {
  const _status = Number(request.query._status)

  if (statuses.includes(_status)) {
    return response.sendStatus(_status)
  }

  return next()
}

module.exports = statusMiddleware
