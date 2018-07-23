<template>
  <div>
    <swiper :tops="tops"></swiper>
    <cart v-for="item in book" :key="item" :book="item"></cart>
    <p class="text-footer" v-if="!more">没有更多数据</p>
  </div>
</template>

<script>
/*
  假设35条数据
  每次加载10
  0-10 10-20 30-40 
  get第几页
  没有更多数据
  page = 0 不能显示
  page> 0 数据长度小于10 停止触底加载
*/
import { get } from '../../utils/util'
import config from '../../config'
import cart from '../../components/Card'
import swiper from '../../components/topswiper'
export default {
  components: {
    cart,
    swiper
  },
  mounted() {
    //页面初始化的时候执行加载函数
    this.getList(true)
    this.getTop()
  },
  data() {
    return {
      book: [],
      page: 0,
      more: false,
      tops: []
    }
  },
  methods: {
    async getList(init) {
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading() //在当前页面显示导航条加载动画。
      wx.request({
        url: 'http://localhost:5757/weapp/booklist',
        method: 'GET',
        data: {
          page: this.page //
        },
        success: res => {
          console.log(res.data.data.list)

          var list = res.data.data.list //获取图书信息
          if (list < 10 && this.page > 0) {
            //每次请求后判断 请求的数据是不是小于10 小于说明数据里面没有数据了
            this.more = false //将more设置成为false 这样就显示没有数据的字样
          }
          if (init) {
            //第一次请求会进来
            this.book = list //把数据给book变量
            wx.stopPullDownRefresh() //手动停止刷新
          } else {
            //下拉刷新
            this.book = this.book.concat(list) //不是第一次就把请求的数组给原来的数组链接上
          }console
        }
      })
      wx.hideNavigationBarLoading() //隐藏导航条加载动画。
    },
    async getTop(){
      console.log("执行top");
      
      let tops = await get('/weapp/top')
      console.log(tops.data.list);
      this.tops = tops.data.list
      
    }
  },
  onPullDownRefresh() {
    this.getList(true)
    this.getTop()
  },
  onReachBottom() {
    console.log(this.more)

    if (!this.more) {
      console.log('没有更多数据')
      return
    }
    this.page = this.page + 1 //下拉一次请求一次 页数+1
    this.getList(false) //并且请求一次
  }
}
</script>

<style scoped>
.text-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24rpx;
}
</style>