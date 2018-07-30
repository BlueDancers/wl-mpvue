let {mysql} = require('../qcloud')
module.exports = async (ctx) => {
  let {id} = ctx.request.query;
  let detail = await mysql("books").select('books.*', 'csessioninfo.user_info') 
                                   .join('csessioninfo', 'books.openid', 'csessioninfo.open_id')
                                   .where("id", id)
                                   .first()

  let info = JSON.parse(detail.user_info)   //将字符串转成对象
  

  //这里返回一个数组 如果不加first就会被[]包围,所以加first返回数组第一个,单边后面操作
  // console.log(detail);
  ctx.state.data = Object.assign(detail,{
    tags:detail.tags.split(','),   //进行分割处理 便于展示
    summary: detail.summary.split('\n'),
    user_info: {
      name: info.nickName, 
      userImg: info.avatarUrl
    }
  })  //将查询的书本数据返回前端
  await mysql('books')
  .where('id',id)
  .increment('count',1)//访问量+1
}