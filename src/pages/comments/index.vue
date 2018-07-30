<template>
  <div>
    <commentlist :list="comment"></commentlist>
  </div>
</template>


<script>
import commentlist from '../../components/commentlist'
import {get} from '../../utils/util.js'
  export default {
    components: {
      commentlist
    },
    data:{
      comment: [],
      userinfo: {}
    },
    methods: {
      init(){
        wx.showNavigationBarLoading()
        this.getComment()
        
      },
      async getComment(){
        await get("/weapp/Commentlist",{openid: this.userinfo.openId}).then((res)=> {
          this.comment = res.data.list
          wx.hideNavigationBarLoading()
        })
      }
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