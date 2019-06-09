const app = require('./app')

const run = (port = 3000) => {
  app.listen(port, () => {
    console.log(`[Webpatch] Listening on localhost:${port}`)
  })
}

module.exports = run