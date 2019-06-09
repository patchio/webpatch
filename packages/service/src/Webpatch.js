const chalk = require('chalk')
const Server = require('./Server')

const log = console.log

class Webpatch {
  constructor() {
    this.server = null
  }

  serve(port = 3000) {
    this.server = Server.listen(port, () => {
      log(chalk.green(`[Webpatch] Listening on localhost:${port}`))
    })
    return this.server
  }
}

module.exports = Webpatch