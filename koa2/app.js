let Koa = require('koa');
let app = new Koa();
let logges = require('./koa-logger')
// app.use( async (ctx,next) => {
//   //ctx是什么? 封装了request和response的对象
//   //next()  下一个中间件
//   ctx.body = "koa"
// })
app.use(logges)
function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise");
    }, 2000);
  })
}
app.use(async (ctx, next) => {
  let url = ctx.request.url;
  
  if(url == '/1'){
    ctx.body = "你的参数是1"
  }else if (url == '/2') {
    ctx.body = "你现在的参数是2"
  }else {
    let html = `<h1>404</h1>`
    ctx.body = html
  }
  //console.log(ctx);
  //await next()
  //next()  //next()就是执行下一个中间件
  //ctx.body += "2"
})

// app.use(async (ctx, next) => {
//   ctx.body += "3"
//   await delay()
//   next()
//   ctx.body += "4"
// })

// app.use(async (ctx, next) => {
//   ctx.body += "5"
//   await next()
//   ctx.body += "6"
// })

app.listen(3000, () => {
  console.log("[Koa is success]");
})