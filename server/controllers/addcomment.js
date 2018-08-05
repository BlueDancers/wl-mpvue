let {mysql} = require('../qcloud');


module.exports = async (ctx) => {
  let { comment,phone,location,bookid,openid } = ctx.request.body
  try {
    await mysql('comments').insert({
      comment,
      phone,
      location,
      bookid,
      openid
    })
    ctx.state.data = {
      msg: 'success'
    }
  } catch (error) {
    ctx.state = {
      code : -1,
      data :{
        msg: '评论失败'+error.sqlMessage
      }
    }
  }
}