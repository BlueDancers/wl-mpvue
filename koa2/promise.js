//使用Promise进行回调的控制
function delay(ward) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ward)
    }, 1000);
  })
}
//这样的代码没有嵌套函数
delay('值1').then((res) => {
  console.log(res);
  return delay('值2')
})
.then((res)=> {
  console.log(res);
  return delay("值3")
})
.then((res)=> {
  console.log(res);
})
