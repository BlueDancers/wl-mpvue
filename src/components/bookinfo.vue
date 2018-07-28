<template>
<div class="bookinfo">
    <!--图片数据-->
  <div class="thumb">
    <img class="back" :src="info.image" mode="aspectFill" alt="">
    <img class="img" :src="info.image" mode="aspectFit">
    <div class="info">
      <div class="title">
        {{ info.title }}
      </div>
      <div class="author">
        {{ info.author }}
      </div>
    </div>
  </div>
    <!--文字展示数据-->
  <div class="owner">
    <div class="detail">
      <div class="detail-user">
        <img :src="userinfo.userImg" mode="aspectFit" alt="">
        <p>{{ userinfo.name }}</p>
      </div>
      <p>
        {{ info.rate }}
         <rate :value="info.rate"></rate>
      </p>
    </div>
    <div class="detail">
      <p>{{ info.publisher }}</p>
      <p>{{ info.price }}</p>
    </div>
  </div>
  <!--简介-->
  <div class="tags">
    <div class="badge" v-for="tag in info.tags" :key="tag">
      {{ tag }}
    </div>
  </div>
  <div class="summary">
    <p v-for="data in info.summary" :key="data">
      {{ data }}
    </p>
  </div>
</div>
</template>

<script>
import rate from '../components/rate'
export default {
  components: {
    rate
  },
  props: ['info'],
  computed: {
    userinfo() {
      return this.info.user_info || {}
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.bookinfo {
  .thumb {
    width: 750rpx;
    height: 500rpx;
    overflow: hidden;
    .back {
      filter: blur(10px);
      width: 100%;
    }
    .img {
      position: absolute;
      height: 300rpx;
      width: 100%;
      left: 10rpx;
      top: 30rpx;
    }
    .info {
      color: white;
      position: absolute;
      width: 100%;
      left: 0;
      top: 330rpx;
      text-align: center;
      .title {
        font-size: 40rpx;
      }
      .author {
        font-size: 30rpx;
      }
    }
  }
  .owner {
    .detail {
      display: flex;
      justify-content: space-between;
      padding: 0 25rpx;
      align-items: center;
      .detail-user {
        display: flex;
        align-items: center;
        img {
          width: 40rpx;
          height: 40rpx;
          border-radius: 50%;
          margin: 10rpx;
        }
      }
      
    }
  }
  .tags {
    .badge {
      display: inline-block;
      margin: 10rpx 10rpx;
      border-radius: 20rpx;
      border: 1rpx #ea5a49 solid;
      padding: 10rpx 10rpx;
      color: #ea5a49;
      font-size: 30rpx;
    }
    
  }
  .summary {
    padding: 0 15rpx;
  }
}
</style>