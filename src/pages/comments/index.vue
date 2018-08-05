<template>
  <div>
    <commentlist v-if="userinfo.openId" :list="comment"></commentlist>
    <card v-for="book in booklist" :key="book" :book='book'></card>
    <div v-if="!booklist">
      暂时没有图书信息,快去添加吧
    </div>
  </div>
</template>


<script>
import commentlist from '../../components/commentlist'
import card from '../../components/Card'
import {get} from '../../utils/util.js'
  export default {
    components: {
      commentlist,
      card
    },
    data:{
      comment: [],
      userinfo: {},
      booklist: []
    },
    methods: {
      init(){
        wx.showNavigationBarLoading()     //加载动画
        this.getComment()
        this.getBoks()
        wx.hideNavigationBarLoading()     //取消动画
      },
      async getComment(){
        await get("/weapp/Commentlist",{openid: this.userinfo.openId}).then((res)=> {
          this.comment = res.data.list
        })
      },
      async getBoks(){
        await get('/weapp/booklist').then((res)=> {
          console.log(res.data.list);
          this.booklist = res.data.list
        })
      }
    },
    onPullDownRefresh(){
      this.init()
      wx.stopPullDownRefresh()
    },
    onShow () {
      if(!this.userinfo.openId){
        this.userinfo = wx.getStorageSync('userinfo')
      }
      this.init()
    }
    
  }
</script>

<style scoped>

</style>