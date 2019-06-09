const program = require('commander')
const Webpatch = require('../src/Webpatch')

const version = require('../package.json').version

program.version(version)

function run (port = 3000) {
  Webpatch.serve(port)
}