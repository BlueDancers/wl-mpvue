<template>
  <div class="detail">
    <bookinfo :info="info"></bookinfo>
    <div class="comment">
      <textarea v-model="comment" maxlength="100" placeholder="请输入图书短评" class="textarea"></textarea>
    </div>
    <div class="user-button">
      <div class="location">
        地理位置:
        <switch color="#ea5a49" @change="getGen" :checked="location"></switch>
        <span class="text-primary ">{{ location }}</span>
      </div>
      <div class="phone">
        手机型号:
        <switch color="#ea5a49" @change="getphone" :checked="phone"></switch>
        <span class="text-primary ">{{ phone }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from '../../utils/util.js'
import bookinfo from '../../components/bookinfo'
export default {
  components: {
    bookinfo
  },
  mounted() {
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
  },
  data() {
    return {
      bookid: '',
      info: {},
      comment: '',
      location: '',
      phone: ''

    }
  },
  methods: {
    async getDetail() {
      let info = await get('/weapp/bookdetail', { id: this.bookid })
      this.info = info.data
      console.log(this.info);
      
      wx.setNavigationBarTitle({
        title: info.data.title
      })
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
    .location{
      margin-top: 20rpx;
    }
    .phone {
      margin-top: 20rpx;
    }
  }
}
</style>
