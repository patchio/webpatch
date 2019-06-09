const Koa = require('koa')
const logger = require('koa-logger')
const views = require('koa-views')
const router = require('./router')

const app = new Koa()

app.use(logger())

app.use(views(`${__dirname}/resource`, {
  extension: 'pug'
}))

app.use(router.routes())

const port = process.env.PORT || 80

app.listen(port, () => {
  console.log(`Listening on localhost:${port}`)
})