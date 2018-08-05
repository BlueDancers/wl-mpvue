let {mysql} = require('../qcloud');

module.exports = async (ctx) => {
  let {bookid,openid} = ctx.request.query

  let mysqlSelect = mysql('comments')
                    .select('comments.*',"csessioninfo.user_info")
                    .join('csessioninfo','comments.openid','csessioninfo.open_id')
   let comments;
   if(bookid){
     //这是获取图书评论的列表
    comments =  await mysqlSelect.where('bookid', bookid)
   } else if(openid){
     //这里获取用户评论的列表
    comments = await mysqlSelect.where('openid', openid)
   }                

  ctx.state.data = {
    list: comments.map((e) => {
      let info = JSON.parse(e.user_info)  //将json转对象
      return Object.assign(e, { //使用Object.assign进行字符拼接
        title: info.nickName,
        image: info.avatarUrl
      })
    })
  }
}

/*
let {
  mysql
} = require('../qcloud');

module.exports = async (ctx) => {
  let {
    bookid
  } = ctx.request.query

  let list = await mysql('comments')
    .select('comments.*', "csessioninfo.user_info")
    .join('csessioninfo', 'comments.openid', 'csessioninfo.open_id')
    .where('bookid', bookid)
    .first()
  let info = JSON.parse(list.user_info)
  Object.assign(list, { //使用Object.assign进行字符拼接
    title: info.nickName,
    image: info.avatarUrl
  })
  delete list.user_info //字符拼接使用后将他删除

  ctx.state.data = {
    list: list
  }

  //info = JSON.parse(list.user_info)
  //console.log(info);

}
*/