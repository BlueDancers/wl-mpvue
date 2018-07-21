const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
  let book = await mysql('books').select('*')//.orderBy('id','desc')
  ctx.state.data = {
    list:book
  }
}