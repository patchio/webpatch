const router = require('koa-router')()

router.get('/', (ctx, next) => {
  return ctx.render('index')
})

module.exports = router