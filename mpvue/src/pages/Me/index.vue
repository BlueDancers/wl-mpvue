<template>
  <div class="container">
    <div class="userinfo">
      <img :src="basedata.avatarUrl" @click="login" alt="useImg">
      <p>{{ basedata.nickName }}</p>
    </div>
    <!-- 实现天数组件 -->
    <yearprogress></yearprogress>

    <button @click="sanBook" class="btn">添加图书</button>
    <button open-type="getUserInfo" @click="login" v-show="loginStatus">登录</button>
  </div>
</template>

<script>
import yearprogress from '@/components/YearProgrees'
import { get,post,showModal } from '../../utils/util'
import config from '../../config'
import qcloud from 'wafer2-client-sdk'
export default {
  components: {
    yearprogress
  },
  created() {
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      console.log('信息写入,隐藏按钮')
      this.loginStatus = false
      this.basedata.avatarUrl = userinfo.avatarUrl
      this.basedata.nickName = userinfo.nickName
    }
  },
  data() {
    return {
      basedata: {
        avatarUrl: '../../../static/img/unlogin.png',
        nickName: '点击登录'
      },
      loginStatus: true
    }
  },
  methods: {
    async addBook(isbn) {
      let userinfo = wx.getStorageSync('userinfo')
      const res = await post('/weapp/addbook',{
        isbn,
        openid : userinfo.openId
      })
      if(res.code == 0&& res.data.title){
        console.log(res.code);   //res是后端返回来的值 code 是状态 0是正确 -1 是错误
        console.log(res.data);   //data是后端的值
        showModal('添加成功',`${res.data.title}添加成功`)
      }else if(res.code == 0){
        showModal("添加失败",res.data.msg)
      }
    },
    sanBook() {
      console.log('开始扫码')
      wx.scanCode({
        success: res => {
          console.log(res);
          if (res.result){
            this.addBook(res.result)
          } 
        },
        fail: res => {
          console.log(res)
        }
      })
    },
    async login(event) {
      const session = qcloud.Session.get()
      console.log(session)
      qcloud.setLoginUrl(config.loginUrl) //请求后端
      if (session) {
        // 第二次登录
        // 或者本地已经有登录态
        // 可使用本函数更新登录态
        qcloud.loginWithCode({
          success: res => {
            console.log(res)
          },
          fail: err => {
            console.error(err)
          }
        })
      } else {
        // 首次登录
        qcloud.login({
          success: res => {
            console.log(res)
            wx.setStorageSync('userinfo', res) //写入缓存
            this.basedata.avatarUrl = res.avatarUrl
            this.basedata.nickName = res.nickName
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            })
            this.loginStatus = false
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

<style lang="less" scoped>
.container {
  padding: 0 30rpx;

  .userinfo {
    margin-top: 100rpx;
    text-align: center;
    img {
      width: 150rpx;
      height: 150rpx;
      margin: 20rpx;
      border-radius: 50%;
    }
  }
}
</style>

