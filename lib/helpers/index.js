const glob = require('tiny-glob')
const ROOT_DIR = process.cwd()
const OXYGEN_DIR = process.env.OXYGEN_DIR || '.oxygen'

async function getPaths() {
  return (await glob(`${OXYGEN_DIR}/**/*.js`))
}

async function getConfiguration() {
  let configuration = {}
  const paths = await getPaths()

  for (let path of paths) {
    let routes = require(`${ROOT_DIR}/${path}`)
    configuration = { ...configuration, ...routes }
  }

  return configuration
}

module.exports = { getConfiguration }
