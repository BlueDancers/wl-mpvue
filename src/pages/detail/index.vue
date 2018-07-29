<template>
  <div class="detail">

    <bookinfo :info="info"></bookinfo>

    <div class="comment">
      <textarea v-model="comment" maxlength="100" placeholder="请输入图书短评" class="textarea"></textarea>
    </div>

    <div class="user-button">
      <div class="location">
        <switch color="#ea5a49" @change="getGeo"></switch>
        地理位置:
        <span class="span text-primary">{{ location }}</span>
      </div>

      <div class="phone">
        <switch color="#ea5a49" @change="getPhone"></switch>
        手机型号:
        <span class="span text-primary">{{ phone }}</span>
      </div>
    </div>

    <button class="comment_b" @click="addComment">
      评论
    </button>
  </div>
</template>

<script>
import { get,post,showModal } from '../../utils/util.js'
import bookinfo from '../../components/bookinfo'
export default {
  components: {
    bookinfo
  },
  mounted() {
    this.bookid = this.$root.$mp.query.id   //从query里面获取数据
    this.getDetail()
    this.userinfo = wx.getStorageSync('userinfo')
  },
  data() {
    return {
      bookid: '',
      userinfo: '',
      info: {},
      comment: '',
      location: '',
      phone: ''
    }
  },
  methods: {
    async getDetail() {
      let info = await get('/weapp/bookdetail', { id: this.bookid })
      this.info = info.data   //书本信息
      wx.setNavigationBarTitle({  //设置标题
        title: info.data.title
      })
    },
    getGeo(e) {
      let ak = 'A9NAUSBr0atr3Cpy5Ke5dU7hsYB1jW9M' //百度地图的token
      let url = 'http://api.map.baidu.com/geocoder/v2/'  //百度地图的请求url
      if (e.target.value) {
        //当用户选择获取
        wx.getLocation({
          type: 'wgs84',
          altitude: true,
          success: res => {
            //获取到经纬度
            console.log(res)
            wx.request({
              url: url,
              data: {
                location: `${res.latitude},${res.longitude}`,  //纬度 经度
                output: 'json',   //纬度,
                ak
              },
              success: res=> {
                if(res.data.status == 0){ //表示成功
                  this.location = res.data.result.formatted_address  //获取到具体位置
                }
              }
            })
          },
          error: ()=> {
            this.location = '未知位置'; 
          }
        })
      } else {
        this.location = ' ';
      }
    },
    getPhone(e) {
      //获取手机信息
      //console.log(e);
      if (e.target.value) {
        let userphone = wx.getSystemInfoSync()
        this.phone = userphone.model
      } else {
        this.phone = ' '
      }
    },
    async addComment (){
      //评论内容
      //手机型号
      //地理位置
      //当前图书id
      //用户open id
      let data = {
        comment: this.comment,
        phone: this.phone,
        location: this.location,
        bookid: this.bookid,
        openid: this.userinfo.openId
      }
      if(!this.comment){
        wx.showModal({
          title: '提示',
          content: '评论不可以为空',
          showCancel:false,
          confirmColor: '#ea5a49'
        })
      }else {
        try {
          await post('/weapp/addcomment',data)
        } catch (error) {
          showModal("失败",error)
        }
        
        this.comment = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  .comment {
    max-width: 20rpx;
    .textarea {
      background: #eee;
      padding: 20rpx;
      width: 730rpx;
      height: 200rpx;
    }
  }
  .user-button {
    .location {
      margin-top: 20rpx;
      font-size: 30rpx;
      .span {
        font-size: 30rpx;
      }
    }
    .phone {
      margin-top: 20rpx;
      font-size: 30rpx;
      .span {
        font-size: 30rpx;
      }
    }
  }
  .comment_b {
    background-color: #ea5a49;
    color: white;
    font-size:18px;
    margin: 10px 0;
  }
}
</style>
