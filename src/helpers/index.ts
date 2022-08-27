import glob from 'fast-glob'

const ROOT_DIR = process.cwd()
const OXYGEN_DIR = process.env.OXYGEN_DIR || '.oxygen'

function getPaths() {
  return glob.sync(`${OXYGEN_DIR}/**/*.js`)
}

export function getConfiguration() {
  let configuration = {}
  const paths = getPaths()

  for (let path of paths) {
    let routes = require(`${ROOT_DIR}/${path}`)
    configuration = { ...configuration, ...routes }
  }

  return configuration
}
