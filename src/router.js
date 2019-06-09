const router = require('koa-router')()
const calcDiffData = require('./utils/diff')

const getFilePath = (name, v) => `tests/${name}.${v}.txt`

router.get('/', async (ctx, next) => {
  const {name, v, ov} = ctx.query

  if (!name || !v) {
    ctx.body = {
      status: 400,
      data: []
    }
    return
  }

  const filePath = getFilePath(name, v)
  const oldFilePath = getFilePath(name, ov)

  try {
    const res = await calcDiffData(filePath, oldFilePath)
    ctx.body = res
  } catch(err) {
    ctx.body = {
      status: 400,
      data: []
    }
  }
})

module.exports = router