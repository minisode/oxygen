import isPlainObject from 'lodash/isPlainObject'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import random from 'lodash/random'
import range from 'lodash/range'
import cuid from 'cuid'
import { fake } from 'faker'

export function generate(data = {}) {
  let object = { id: cuid() }

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

    if (Array.isArray(data[key])) {
      object[key] = range(random(5)).map((_) => generate(data[key][0]))
    }
  }

  return object
}
