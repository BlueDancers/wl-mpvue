//这里四层回调   使用 callback promise   asyncawait

function ajax(call) {
  setTimeout(() => {
    console.log("回调执行完毕");
    call("我第二");
  }, 1000);
}
//解决方案1 callback 回调
ajax((data) => {
  setTimeout(() => {
    console.log(data);
    ajax_one("我第三")
  }, 1000);
})

function ajax_one(data){
  console.log(data);
  ajax_two()
}

function ajax_two(){
  console.log("我第四");
}





