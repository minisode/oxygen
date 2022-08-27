const isPlainObject = require('lodash/isPlainObject')
const isFunction = require('lodash/isFunction')
const isString = require('lodash/isString')
const isArray = require('lodash/isArray')
const random = require('lodash/random')
const range = require('lodash/range')
const { nanoid } = require('nanoid')
const { fake } = require('faker')

function generate(data = {}) {
  let object = { id: nanoid() }

  for (let key of Object.keys(data)) {
    if (isFunction(data[key])) {
      object[key] = data[key]()
    }

    if (isPlainObject(data[key])) {
      object[key] = generate(data[key])
    }

    if (isString(data[key])) {
      object[key] = fake(`{{${data[key]}}}`)
    }

    if (isArray(data[key])) {
      object[key] = range(random(5)).map(_ => generate(data[key][0]))
    }
  }

  return object
}

module.exports = { generate }
