let {mysql} = require('../qcloud');

module.exports =async (ctx)=> {
  let top = await mysql('books').select('id','title','image','count').orderBy('count','desc').limit(9)
  ctx.state.data = {
    list: top
  }
}