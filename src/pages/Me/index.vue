<template>
  <div class="container">
    <div class="userinfo">
      <img :src="basedata.avatarUrl" alt="useImg">
      <p>{{ basedata.nickName }}</p>
    </div>
    <!-- 实现天数组件 -->
    <yearprogress></yearprogress>

    <button @click="sanBook" class="btn">添加图书</button>
    <button open-type="getUserInfo" @getuserinfo="Login" v-show="loginStatus">登录</button>
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
        nickName: ' '
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
    async Login(res) {
      qcloud.setLoginUrl(config.loginUrl) //请求后端
      const session = await qcloud.Session.get()
      wx.showLoading({
          title: '登录中',
      })
      if (session) {
        // 第二次登录
        // 或者本地已经有登录态
        // 可使用本函数更新登录态
        qcloud.loginWithCode({
          success: res => {
            console.log(res)
            this.userinfo = res
            wx.setStorageSync('userinfo', this.userinfo)
             wx.showToast({
              title: '你已经登录了',
              icon: 'success',
              duration: 2000
            })
          },
          fail: err => {
            console.log(err)
          },
          complete: ()=> {
            wx.hideLoading()
          }
        })
      } else {
        // 首次登录
        qcloud.login({
          success: res => {
            this.userinfo = res
            wx.setStorageSync('userinfo', this.userinfo)
            this.basedata.avatarUrl = this.userinfo.avatarUrl
            this.basedata.nickName = this.userinfo.nickName
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: err => {},
          complete: ()=> {
            wx.hideLoading()
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

