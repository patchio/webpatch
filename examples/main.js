const Koa = require('koa')
const logger = require('koa-logger')
const views = require('koa-views')
const router = require('./router')
const proxy = require('koa-proxies')
const Webpatch = require('../packages/service/src/Webpatch')

const port = process.env.PORT || 3001
const app = new Koa()
const webpatch = new Webpatch()

app.use(logger())

app.use(views(`${__dirname}/resource`, {
  extension: 'pug'
}))

app.use(proxy('/resource', {
  target: 'http://localhost:3000',
  changeOrigin: true,
  logs: true
}))

app.use(router.routes())

app.listen(port, () => {
  console.log(`Listening on localhost:${port}`)
})

webpatch.serve()