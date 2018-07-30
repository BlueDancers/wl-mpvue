<template>
  <div class="detail">
    <bookinfo :info="info"></bookinfo>   <!--书本详情-->
    <commentlist :list="comments"></commentlist>  <!--显示评论模块-->

    <div class="show" v-if="showComment">
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
    <div class="unshow" v-else-if="showComment">
      您没有登录或者已经评论过了
    </div>
  </div>
</template>

<script>
import { get,post,showModal } from '../../utils/util.js'
import bookinfo from '../../components/bookinfo'
import commentlist from '../../components/commentlist'
export default {
  components: {
    bookinfo,
    commentlist
  },
  mounted() {
    this.bookid = this.$root.$mp.query.id           //从query里面获取图书id用于对接数据库获取图书信息
    this.getDetail()                                //获取指定id的图书数据
    this.userinfo = wx.getStorageSync('userinfo')   //将用户信息加入变量
    this.getComments()                              //获取评论列表
  },
  data() {
    return {
      bookid: '',                   //从主页面获取的bookid
      userinfo: '',                 //用户信息,用户评论模块的
      info: {},                     //图书信息
      comment: '',                  //用户的评论信息
      location: '',                 //地理位置信息
      phone: '',                    //手机信息
      comments: []                  //全部评论信息
    }
  },
  computed: {
    showComment(){
      if(!this.userinfo){
        return false;//用户没有登录
      }
      if(this.comments.filter(e=>e.openid === this.userinfo.openId) && this.comments.length !== 0){
        console.log("有评论了,返回false");
        return false; //用户存在  
      }
      console.log("返回true");
      
      return true;   //这里用户登录了 并且评论数据库里面没有该用户评论的字段
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
    async getComments(){
      console.log(this.bookid);
      
      await get('/weapp/Commentlist',{bookid: this.bookid}).then((res)=> {    //获取评论
        this.comments = res.data.list
        console.log(res.data.list);
        
      })
    },
    getGeo(e) {                                                           //获取地理位置
      let ak = 'A9NAUSBr0atr3Cpy5Ke5dU7hsYB1jW9M'                         //百度地图的token
      let url = 'http://api.map.baidu.com/geocoder/v2/'                   //百度地图的请求url
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
    getPhone(e) {                //获取手机信息
      //console.log(e);
      if (e.target.value) {
        let userphone = wx.getSystemInfoSync()
        this.phone = userphone.model
      } else {
        this.phone = ' '
      }
    },
    async addComment (){        //添加评论
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
          await post('/weapp/addcomment',data).then((res)=> {
            if(res.data.msg = "success"){    
              showModal("提示","评论成功")
              this.comment = ''
              this.getComments()
            }else {
              showModal("失败",res.data.msg)   //错误回调
            }
            
          })
        } catch (error) {
          showModal("失败",error)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  .show {
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
  .unshow {
    display:flex;
    justify-content: center;
    font-size: 30rpx;
  }
}
</style>
