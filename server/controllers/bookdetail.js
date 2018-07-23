let {mysql} = require('../qcloud')
module.exports = async (ctx) => {
  let {id} = ctx.request.query;
  await mysql('books')
  .where('id',id)
  .increment('count',1)
}