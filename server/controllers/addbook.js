const https = require('https')
const {
  mysql
} = require('../qcloud')
//新增图书

//获取豆瓣信息
//https://api.douban.com/v2/book/isbn/:name
//入库

module.exports = async (ctx) => {
  const {
    isbn,
    openid
  } = ctx.request.body;
  if (isbn && openid) {
    let findbooks = await mysql('books').select().where('isbn', isbn)
    if (findbooks.length) {
      ctx.state = {
        code: 0,
        data: {
          msg: '该书本已存在'
        }
      }
      return
    }

    let url = 'https://api.douban.com/v2/book/isbn/' + isbn

    await getJSON(url).then(res => {
      let rate = res.rating.average //评分
      let {
        title,
        image,
        alt,
        publisher,
        summary,
        price
      } = res
      // let title = res.title//书名
      // let image = res.image //书本封面
      // let alt = res.alt //图书链接
      // let publisher = res.publisher //出版社 
      // let summary = res.summary //简介
      // let price = res.price //价格
      let tags = res.tags.map(v => { //书的标签
        return `${v.title} ${v.count}`
      }).join(',')
      let author = res.author.join(',') //作者
      console.log(author);

      try {
        newFunction(isbn, openid, title, image, alt, publisher, summary, price, rate, tags, author);
        ctx.state.data = {
          title,
          mes: "success"
        }
      } catch (error) {
        ctx.state = {
          code: -1,
          data: {
            msg: '新增失败' + error
          }
        }
      }
    })
  }
}

async function newFunction(isbn, openid, title, image, alt, publisher, summary, price, rate, tags, author) {
  await mysql('books').insert({
    isbn,
    openid,
    title,
    image,
    alt,
    publisher,
    summary,
    price,
    rate,
    tags,
    author
  });
}

function getJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let urlData = ""
      res.on('data', data => {
        urlData += data
      })
      res.on('end', (data => {
        const bookinfo = JSON.parse(urlData)
        if (bookinfo.title) {
          resolve(bookinfo)
        }
        reject(bookinfo)
      }))
    })
  })
}
