#!/usr/bin/env node
const fs = require('fs-extra')
const nodemon = require('../lib/nodemon')
const optparse = require('../lib/optparse')
const options = optparse(process.argv.slice(2))
const OXYGEN_DIR = options._[0] || '.oxygen'

process.env.OXYGEN_DIR = OXYGEN_DIR
process.env.PORT = options.port

fs.ensureDirSync(OXYGEN_DIR)
options.watch ? nodemon.watch(OXYGEN_DIR) : require(nodemon.file)
