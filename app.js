const Koa = require('koa')
const router = require('koa-router')()
const calcDiffData = require('./diff')

const app = new Koa()

router.get('/', async (ctx, next) => {
  const res = await calcDiffData('tests/1.txt', 'tests/2.txt')
  ctx.body = res
})

app.use(router.routes())

module.exports = app