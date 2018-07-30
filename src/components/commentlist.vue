<template>
  <div class="comment-list">
    <div class="comments" v-for="list in list" :key="list">
      <div class="user">
        <div class="inline">
          <img :src="list.image" class="avatar" alt="" mode="aspectFit">
          {{ list.title }}
        </div>
          <div class="content">
          {{ list.comment }}
        </div>
        <div class="rigth">
          {{ list.location || "未知地点" }}
          <span class="text-primary">
            --
          </span>
          {{ list.phone || "未知型号" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["list"]
  }
</script>

<style lang="less" scoped>
  .comment-list {
    background: #eee;
    font-size: 30rpx;
    .comments {
      background: white;
      margin-bottom: 20rpx;
      padding: 10rpx 20rpx;
      .user {
        font-size: 30rpx;
        .inline {
          display: flex;
          align-items: center;
          .avatar {
            width: 30rpx;
            height: 30rpx;
            border-radius: 50%;
            margin-right: 10rpx;
          }
        }
        .content {
          font-size: 35rpx;
        }
        .rigth {
          display: flex;
          justify-content: flex-end;
          font-size: 25rpx;
        }
      }
    }
  }
</style>
