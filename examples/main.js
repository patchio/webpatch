const Koa = require('koa')
const logger = require('koa-logger')
const views = require('koa-views')
const router = require('./router')
const Webpatch = require('../packages/service/src/main')

const port = process.env.PORT || 80
const app = new Koa()

app.use(logger())

app.use(views(`${__dirname}/resource`, {
  extension: 'pug'
}))

app.use(router.routes())

app.listen(port, () => {
  console.log(`Listening on localhost:${port}`)
})

Webpatch()