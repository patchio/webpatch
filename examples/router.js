const router = require('koa-router')()

router.get('/', (ctx, next) => {
  return ctx.render('index')
})

router.get('/resource/*', (ctx, next) => {
})

module.exports = router