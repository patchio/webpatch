const Koa = require('koa')
const logger = require('koa-logger')
const router = require('./router')

const app = new Koa()

app.use(logger())
app.use(router.routes())

module.exports = app