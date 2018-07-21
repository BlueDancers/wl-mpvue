module.exports = async (ctx,next) => {
  const start = new Date().getTime();
  await next();
  const end = new Date().getTime();
  console.log(ctx.request.url , end-start , ctx.body.length);
}

//使用koa实现的查看响应时间的中间件