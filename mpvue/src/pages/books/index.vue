<template>
  <div>
    <p>图书列表页面</p>
    <button open-type="getUserInfo" lang="zh_CN" @click="doLogin">获取用户信息</button>
  </div>
</template>

<script>
import { get } from '../../utils/util'
import config from '../../config'
import qcloud from 'wafer2-client-sdk'
export default {
  methods: {
    doLogin() {
      const session = qcloud.Session.get()
      qcloud.setLoginUrl(config.loginUrl)   //请求后端
      if (session) {
        // 第二次登录
        // 或者本地已经有登录态
        // 可使用本函数更新登录态
        qcloud.loginWithCode({
          success: res => {
            console.log(res);
             wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: err => {
            console.error(err)

          }
        })
      } else {
        // 首次登录
        qcloud.login({
          success: res => {
             console.log(res);
             wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: err => {
            console.error(err)
          }
        })
      }
    }
  }
}
</script>

<style scoped>
</style>