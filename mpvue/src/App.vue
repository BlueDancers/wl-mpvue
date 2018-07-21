<template>
  <div>
    这里是App
  </div>
</template>

<script>
export default {
  //async 
  created() {
    // const res = await get('weapp/data')
    // console.log(res);

    // wx.request({
    //   url: config.host+"weapp/data",
    //   success: (res)=> {
    //     console.log(res);
    //   }
    // })
    console.log('小程序启动')
  }
}
</script>

<style>
.btn {
  background-color: #ea5a49;
  color: white;
  margin-bottom: 10px;
  padding-left: 15px;
  border-radius: 2px;
  font-size: 16px;
  line-height: 40px;
  width: 100%;
}
.btn:active {
  background-color: #fa5a49;
}
</style>