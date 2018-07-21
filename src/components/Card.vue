<template>
  <div class="book" @click="zz">
    <div class="thumb">
      <img :src="book.image" class="image" alt="">
    </div>
    <div class="detail">
      <div class="row text-primary">
        <div class="rigth">
          {{ book.title }}
        </div>
        <div class="left">
        <rate :value="book.rate"></rate> {{ book.rate }} 
        </div>
      </div>
      <div class="row">
        <div class="rigth">
          {{ book.author }}
        </div>
        <div class="left">
         浏览量:
        </div>
      </div>
      <div class="row">
        <div class="rigth">
          {{ book.publisher }}
        </div>
        <div class="left">
         添加人:
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rate from './rate'
export default {
  components: {
    rate
  },
  props: {
    book : {
      type: Array
    }
  },
  methods: {
    zz(){
      console.log(this.book);
    }
  }
}
</script>

<style lang="less" scoped>
.book {
  font-size: 30rpx;
  padding: 10rpx;
  overflow: hidden;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
  display: flex;
  align-items: center;
  .thumb {
    img {
      height: 180rpx;
      width: 150rpx;
    }
  }
  .detail {
    width: 550rpx;
    .row {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .rigth {
        margin-left: 40rpx;
        overflow: hidden;
        width: 200px;
      }
      .left {
        width: 200rpx;
      }
    }
  }
}
</style>
