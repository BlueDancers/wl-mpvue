const {
  mysql
} = require('../qcloud')

module.exports = async (ctx) => {
  let {
    page
  } = ctx.request.query; //获取get参数
  const size = 10 //每次加载10个数据
  let book = await mysql('books') //操作books这和数据库 
    .select('books.*', 'csessioninfo.user_info') //查询 books里面的全部 以及csessioninfo.user_info这和字段
    .join('csessioninfo', 'books.openid', 'csessioninfo.open_id') //创建多表查询链接 链接的是csessioninfo字段是books.openid csessioninfo.open_id
    .limit(size) //设置每次获取的数据个数
    .offset(Number(page) * size)   //设置从什么地方开始获取
    .orderBy('books.id', 'desc') //倒排序
  //console.log("获取图书内容-------------------------------------------------------------------------------------", book);
  ctx.state.data = {
    list: book.map(v => {
      let info = JSON.parse(v.user_info);
      return Object.assign(v, { //数组连接
        user_info: {
          nickName: info.nickName
        }
      })
    })
  }
}
